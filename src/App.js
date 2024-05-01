import React, { useState, useEffect } from 'react';
import { Form, useFieldAnswer } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import "./styles.css";
import "./skill-block"
import "./optionscale"
import "./tutorial-text"

import skillsData from './skills.json';
import robotsData from './robots.json'

registerCoreBlocks();

const redirectToProlific = () => {
  window.location.href = 'https://www.prolific.co';
};

function getSkillLabelAndExplanation(skillLevel) {
  const skillDescriptions = {
    1: { label: "Not at all", explanation: "The robot does not possess this skill in any capacity." },
    2: { label: "Barely", explanation: "The robot possesses this skill to a minimal extent, indicating rudimentary or basic functionality." },
    3: { label: "Somewhat", explanation: "The robot somewhat possesses this skill, showing a moderate level of functionality." },
    4: { label: "Moderately", explanation: "The robot possesses this skill at a moderate level, capable of performing tasks requiring this skill with a fair degree of efficiency." },
    5: { label: "Very much", explanation: "The robot very much possesses this skill, demonstrating a high level of proficiency and capability." },
    6: { label: "Extremely", explanation: "The robot possesses this skill to an extreme degree, indicating advanced functionality and expertise." },
    7: { label: "Completely", explanation: "The robot completely possesses this skill, showcasing maximum proficiency and the ability to perform related tasks flawlessly." },
  };

  return skillDescriptions[skillLevel] || { label: "Unknown", explanation: "The provided number is outside the expected range of skill levels." };
}

function getRandomSkills(skills, count = 5) {
  const shuffled = skills.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateEvaluationBlocks(randomRobots, randomSkills) {
  // Initialize an array to hold all the blocks
  let blocks = [];

  // Iterate over each robot
  console.log(randomRobots)
  randomSkills.forEach((skill, skillIndex) => {
    // For each robot, iterate over the random skills
    randomRobots.forEach((robot, robotIndex) => {
      // Generate unique IDs
      const groupId = `${robot.name}_${robotIndex + 1}_${skillIndex}`;
      const skillTextBlockId = `${robot.name}_${skill.name}`;
      const optionScaleId = `${robot.name}_${skill.name}_rating`;

      // Construct the block for the current robot and skill
      const block = {
        id: groupId,
        name: "group",
        attributes: {
          label: "Evaluate the following:",
          layout: "split-right",
          attachment: {
              type: "image",
              url: robot.imagePath
            },
          description: `Examine the image and the skill provided below. Determine to what extent the robot presented possess ${skill.name}.`
        },
        innerBlocks: [
          {
            name: "skill-text-block",
            id: skillTextBlockId,
            attributes: {
              skillName:`Skill: ${skill.name}`,
              shortDescription: skill.shortDescription,
              fullDescription: skill.fullDescription,
              items: skill.items.map(item => ({
                title: item.title,
                text: item.text
              }))
            }
          },  
          {
            name: "option-scale",
            id: optionScaleId,
            attributes: {
              label: "Skill Evaluation",
              description: `On a scale of 1 to 7, to what extent do you believe the robot shown possesses ${skill.name}?`,
              required: true,
              start: 1,
              end: 7,
              startLabel: "Not at all",
              endLabel: "Completely",
              labels: {
                1: "Not at all",
                2: "Barely",
                3: "Somewhat",
                4: "Moderately",
                5: "Very much",
                6: "Extremely",
                7: "Completely"
              }
            }
          },
          {
            "name": "tutorial-text-block",
            "id": "before_processding",
            "attributes": {
              "text": "Take your time to evaluate. Once you're ready, click the OK button to proceed.",
            }
          }
        ]
      };

      // Add the constructed block to the blocks array
      blocks.push(block);
    });
  });

  return blocks;
}


function selectRobots(robotsData) {
  // Select one robot from each category
  const selectedRobots = robotsData.categories.map(category => {
    const randomIndex = Math.floor(Math.random() * category.robots.length);
    return {
      ...category.robots[randomIndex],
      categoryName: category.name
    };
  });

  // Combine all robots into a single array
  const allRobots = robotsData.categories.flatMap(category => 
    category.robots.map(robot => ({ ...robot, categoryName: category.name }))
  );

  // Filter out the already selected robots
  const remainingRobots = allRobots.filter(robot =>
    !selectedRobots.find(selectedRobot => selectedRobot.imagePath === robot.imagePath)
  );

  // Shuffle the remaining robots
  const shuffledRemainingRobots = remainingRobots.sort(() => 0.5 - Math.random());

  // Select 2 additional robots from the shuffled remaining robots
  const additionalRobots = shuffledRemainingRobots.slice(0, 2);

  // Combine the initially selected robots with the additional robots
  return selectedRobots.concat(additionalRobots);
}

const App = () => {
  const [randomSkills, setRandomSkills] = useState([]);
  const [randomRobots, setrandomRobots] = useState([]);

  useEffect(() => {
    setRandomSkills(getRandomSkills(skillsData.skills));
    setrandomRobots(selectRobots(robotsData))
  }, []);
  const exampleAnswer = useFieldAnswer("example-rating-answer");
  const definitionsClear = useFieldAnswer("definitions-clear-question");

  const getFormBlocks = () => {
    const blocks = generateEvaluationBlocks(randomRobots, randomSkills)
    const preDynamicBlocks = [
      {
        name: "welcome-screen",
        id: "jg1401r",
        attributes: {
          label: "Welcome to this Human Robots Interaction survey",
          description: `In this survey, you will be presented with images of various robots.
          For each robot, you will be asked to rate to what extent you believe
          the robot possesses certain skills. Your honest ratings will help us understand 
          human perception of robotic capabilities`,
        }
      },
      {
        "id": "informed_concent_group",
        "name": "group",
        "attributes": {
          "label": "But first... ",
          "description": "Please read and agree to the following"
        },
        "innerBlocks": [
          {
            name: "skill-text-block",
            id: "informed_content",
            attributes: {
              skillName: "Informed Consent",
              fullDescription: `                Dear participant,
              <br />
              Thank you for accepting this HIT. This HIT is a part of a study being done by Prof. David Sarne and lab members from Bar-Ilan University, and was approved by the Institutional Review Board (IRB) of Bar-Ilan University.
              <br />
              <br />
              The purpose of this research is to study human behavior. The estimated time required for participation and the compensation for completing it can be found in the study description on Prolific.
              <br />
              <br />
              We believe there are no known risks associated with this research HIT; however, as with any online related activity the risk of a breach of confidentiality is always possible. To the best of our ability, your answers in this study will remain confidential. We will minimize any risks by storing all data in a secured server. To save your anonymity, your Prolific ID will be used only to distribute payment to you.
              <br />
              <br />
              Your participation in this HIT is entirely voluntary and you can withdraw at any time. There will be no penalty for withdrawal (though you will not complete the study and get paid). We sincerely appreciate your consideration and participation in this study.
    If you encounter any technical problem with the study, or have any questions or comments, please contact us by sending a message using the Prolific system. 
              <br />
              <br />
              By clicking “I agree” below you are indicating that you are at least 18 years old, have read and understood this consent form and agree to participate in this research study.
              <div className="alert alert-info mt-3">
                <strong>
                Please note that you can participate in this study only once. <br />
    Therefore, once you click the "I agree" button, you will not be able to start the study again or open it in another window/tab.<br />
    Also, to avoid potential issues, please do NOT click the refresh button nor the back button while participating in this study.`
            }
          },
          {
            "name": "tutorial-text-block",
            "id": "click_to_expand",
            "attributes": {
              "text": "You can click on the text to expand it.",
            }
          },
          {
            name: "multiple-choice",
            id: "agree_disagree",
            attributes: {
              required: true,
              multiple: false,
              verticalAlign: false,
              label: "Do you agree to the informed consent?",
              choices: [
                {
                  label: "I agree",
                  value: "agree"
                },
                {
                  label: "I do not agree",
                  value: "idontagree"
                }
              ]
            }
          },
        ]
      },
      {
        name: "short-text",
        id: "kd12edg",
        attributes: {
          layout: "center",
          required: true,
          label: `Thank you for agreeing!`,
          description: "Let's start with your name"
        }
      },
      {
        name: "slider",
        id: "93pda11",
        attributes: {
          label: "Hi {{field:kd12edg}}! Please select your age",
          min: 18,
          max: 100,
          step: 1
        }
      },
      {
        name: "multiple-choice",
        id: "gqr1294c",
        attributes: {
          required: true,
          multiple: false,
          verticalAlign: false,
          label: "{{field:kd12edg}}, please select your gender",
          choices: [
            {
              label: "Male",
              value: "male"
            },
            {
              label: "Female",
              value: "female"
            },
            {
              label: "I would rather not tell",
              value: "iwrnt"
            }
          ]
        }
      },
      {
        "name": "dropdown",
        "id": "3nsdf934",
        "attributes": {
          "label": "Please select your education level.",
          "choices": [
            {
              "label": "No formal education",
              "value": "no-formal-education"
            },
            {
              "label": "Primary education",
              "value": "primary-education"
            },
            {
              "label": "Secondary education or high school",
              "value": "secondary-education-high-school"
            },
            {
              "label": "Vocational qualification",
              "value": "vocational-qualification"
            },
            {
              "label": "Bachelor's degree",
              "value": "bachelors-degree"
            },
            {
              "label": "Master's degree",
              "value": "masters-degree"
            },
            {
              "label": "Doctorate or higher",
              "value": "doctorate-or-higher"
            },
            {
              "label": "Other",
              "value": "other"
            }
          ]
        }
      },

      {
        "name": "statement",
        "id": "g91imf1023",
        "attributes": {
          "label": "So what is this survey about?",
          "description": "In this survey we want your honest expectations regarding the capabilities and skills of different robots. Click the button below to see how it is done.",
          "buttonText": "Show me!",
          "quotationMarks": false
        }
      },

      {
        "id": "sdfdfvsdf",
        "name": "group",
        "attributes": {
          "label": "Tutorial Example",
          "layout": "split-right",
          "attachment": {
            "type": "image",
            "url": "https://i.insider.com/65e04b136080194819fb1a66?width=1136&format=jpeg"
          },
          "description": "This tutorial will guide you through the process of evaluating a robot's skill based on it's image. The image on the right features the robot you are currently assessing. You will determine how well the robot exemplifies a specific skill detailed below."
        },
        "innerBlocks": [
          {
            "name": "tutorial-text-block",
            "id": "sample_label_evaluate_robot_explain",
            "attributes": {
              "text": "Please note the text below provides an explanation of the skill. This explanation does not relate to about the specific robot but rather describes the skill itself",
          }
        },
          {
            "name": "skill-text-block",
            "id": "jg1401rssdd",
            "attributes": {
              "skillName": "Skill: Sensorimotor Interaction",
              "shortDescription": "Perception and manipulation of objects in environments using various modalities.",
              "fullDescription": "Sensorimotor interaction encompasses the ability to perceive objects, recognize patterns, and manipulate these objects in both physical and virtual environments using body parts (like limbs) or other physical or virtual actuators. This skill is not limited to sensory and actuator modalities but also involves mixing representations for effective interaction. Different modalities, such as those used by blind individuals or technologies like radar in bats or robots, demonstrate the adaptability of sensorimotor interaction in understanding and manipulating the surrounding world.",
              "items": [
                {
                  "title": "Robot with Sensorimotor Interaction",
                  "text": "An autonomous robot designed for search-and-recovery tasks in disaster zones showcases sensorimotor interaction by navigating through rubble using tactile feedback and ultrasonic sensors to detect obstacles. It manipulates objects using articulated arms, adapting its grip based on the object's size, shape, and weight. This robot's ability to perceive and interact with its environment, combining various sensory inputs and motor outputs, allows it to efficiently locate and retrieve items under challenging conditions."
                },
                {
                  "title": "Robot Lacking Sensorimotor Interaction",
                  "text": "A conveyor belt robot in a manufacturing plant, designed to move products from one location to another, lacks the sensorimotor interaction capabilities. It operates in a highly controlled environment with minimal variability and does not require perception of its surroundings or the objects it transports. The lack of sensory and actuator modalities to adapt to changing environments or manipulate objects based on their physical properties illustrates a robot devoid of sensorimotor interaction skills."
                }
              ]
            }
          },
          {
            "name": "tutorial-text-block",
            "id": "sample_label_evaluate_robot",
            "attributes": {
              "text": "You can expand the description of the skill for more details, as well as each example for examples regarding this skill.",
          }
        },
          {
            "name": "option-scale",
            "id": "example-rating-answer",
            "attributes": {
              "label": "Skill Evaluation Scale",
              "description": "Using a scale of 1 to 7, please rate to what extent you belive the described robot possess the described skill, with 1 being 'Not at all' and 7 being 'Completely'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not at all",
              "endLabel": "Completely",
              "labels": {
                "1": "Not at all",
                "2": "Barely",
                "3": "Somewhat",
                "4": "Moderately",
                "5": "Very much",
                "6": "Extremely",
                "7": "Completely"
              }
            }
          },
          {
            "name": "tutorial-text-block",
            "id": "before_processding",
            "attributes": {
              "text": "Take your time to evaluate. Once you're ready, click the OK button to proceed.",
            }
          }
        ]
      },
      {
        "name": "statement",
        "id": "343892jd",
        "attributes": {
          label: `Your selection: {{field:example-rating-answer}} - "${getSkillLabelAndExplanation(exampleAnswer)['label']}"`,
          description: `This rating indicates that ${getSkillLabelAndExplanation(exampleAnswer)['explanation']}`,
          buttonText: "I understand",
          quotationMarks: false,
        }
      },
      {
        "name": "statement",
        "id": "343892jsdd",
        "attributes": {
          label: `Let's begin the study!`,
          description:"There are no right or wrong answers. Please respond based on your true opinion.",
          "buttonText": "Begin",
          "quotationMarks": false,
        }
      },
    ]

    const postDynamicBlocks = [
      {
        name: "multiple-choice",
        id: "definitions-clear-question",
        attributes: {
          required: true,
          label: "Were all definitions during the survey clear to you?",
          choices: [
            {
              label: "Yes",
              value: "yes"
            },
            {
              label: "No",
              value: "no"
            }
          ]
        }
      },
      ...(definitionsClear?.includes("no")
        ? [
            {
              name: "long-text",
              id: "unclear-definitions",
              attributes: {
                required: true,
                label: "Please specify which definitions were not clear."
              }
            }
          ]
        : []),
      {
      "name": "statement",
      "id": "thank_for_answering",
      "attributes": {
        label: `Thank you for answering this survey`,
        description:"We have couple more questions to ask regarding the survey itself.",
        "buttonText": "OK",
        "quotationMarks": false,
      }
    },
    {
      name: "long-text",
      id: "problems_finish",
      attributes: {
        required: true,
        label: "Any problems you faced during the survey?"
      }
    },

    {
      name: "long-text",
      id: "suggestions_finish",
      attributes: {
        required: true,
        label: "Any suggestions for improving the survey?"
      }
    }
]
    return [...preDynamicBlocks, ...blocks, ...postDynamicBlocks];
  }
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      
      <Form
        formId="1"
        formObj={{
          blocks: getFormBlocks(),
          settings: {
            animationDirection: "vertical",
            disableWheelSwiping: true,
            disableNavigationArrows: true,
            disableProgressBar: true
          },
          messages: {
            'block.defaultThankYouScreen.label': "Thank you for participating"
          },

          theme: {
            font: "Roboto",
            buttonsBgColor: "#0060df",
            logo: {
              src: ""
            },
            questionsColor: "#000",
            answersColor: "#0aa7c2",
            buttonsFontColor: "#fff",
            buttonsBorderRadius: 25,
            errorsFontColor: "#fff",
            errorsBgColor: "#f00",
            progressBarFillColor: "#000",
            progressBarBgColor: "#ccc"
          }
        }}
        onSubmit={(data, { completeForm, setIsSubmitting }) => {
          setTimeout(() => {
            setIsSubmitting(false);
            completeForm();
          }, 500);
        }}
        beforeGoingNext={
          ({
            setIsFieldValid,
            setIsPending,
            currentBlockId,
            answers,
            setFieldValidationErr,
            setIsCurrentBlockSafeToSwipe,
            goToBlock,
            goNext
          }) => {
            if (
             currentBlockId === "informed_concent_group" &&
             answers['agree_disagree'].value[0] === "idontagree"
           ) {
             redirectToProlific();
             setIsFieldValid(currentBlockId, false);
             setFieldValidationErr(currentBlockId, "This is a test");
             setIsCurrentBlockSafeToSwipe(false);
           } else {
             setIsFieldValid(currentBlockId, true);
             setFieldValidationErr(currentBlockId, "");
             setIsCurrentBlockSafeToSwipe(true);
             goNext();
           }
         }
        }
      />
    </div>
  );
};

export default App;
