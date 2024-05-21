import React, { useState, useEffect } from 'react';
import { Form, useFieldAnswer } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import "./styles.css";
import "./skill-block";
import "./optionscale";
import "./tutorial-text";

registerCoreBlocks();

const redirectToProlific = () => {
  window.location.href = 'https://www.prolific.co';
};

const App = () => {
  const [urlParams, setUrlParams] = useState({
    PROLIFIC_PID: '',
    STUDY_ID: '',
    SESSION_ID: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prolificPid = params.get('PROLIFIC_PID');
    const studyId = params.get('STUDY_ID');
    const sessionId = params.get('SESSION_ID');

    if (!prolificPid || !studyId || !sessionId) {
      redirectToProlific();
    } else {
      setUrlParams({
        PROLIFIC_PID: prolificPid,
        STUDY_ID: studyId,
        SESSION_ID: sessionId
      });
    }
  }, []);
  
  const definitionsClear = useFieldAnswer("definitions-clear-question");
  const getFormBlocks = () => {
    const preDynamicBlocks = [
      {
        name: "welcome-screen",
        id: "jg1401r",
        attributes: {
          label: "Survey on Bystander Assistance to Robots",
          description: `We are conducting a survey to understand the factors that influence a bystander’s willingness to assist robots in different scenarios. Your responses will help us design better robotic systems. 
          This survey will take approximately 10 minutes.`,
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
      // {
      //   name: "short-text",
      //   id: "kd12edg",
      //   attributes: {
      //     layout: "center",
      //     required: true,
      //     label: `Thank you for agreeing!`,
      //     description: "Let's start with your name"
      //   }
      // },
      {
        name: "slider",
        id: "93pda11",
        attributes: {
          label: "Thank you for agreeing! Please select your age",
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
          label: "Please select your gender",
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
        name: "multiple-choice",
        id: "gqr1294c1",
        attributes: {
          required: true,
          multiple: false,
          verticalAlign: false,
          label: "How familiar are you with robots",
          choices: [
            {
              label: "Not at all familiar",
              value: "naaf"
            },
            {
              label: "Somewhat familiar",
              value: "swf"
            },
            {
              label: "Very familiar",
              value: "vf"
            }
          ]
        }
      },
      {
        "name": "statement",
        "id": "g91imf1023",
        "attributes": {
          "label": "Let's begin with some general questions.",
          "description": "Next you will see some questions and a likert scale, you should choose from 1 to 7 the number that is most suiteable.",
          "buttonText": "Show me!",
          "quotationMarks": false
        }
      },
      {
        "name": "option-scale",
        "id": "general_q1",
        "attributes": {
          "label": "How comfortable are you with the idea of robots operating in public spaces?",
          "description": "Using a scale of 1 to 7, please rate your level of comfort with robots operating in public spaces, with 1 being 'Not comfortable at all' and 7 being 'Completely comfortable'.",
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
        "name": "option-scale",
        "id": "general_q2",
        "attributes": {
          "label": "How likely are you to help a robot if it asked for assistance?",
          "description": "Using a scale of 1 to 7, please rate your likelihood of helping a robot that asks for assistance, with 1 being 'Not likely at all' and 7 being 'Extremely likely'.",
          "required": true,
          "start": 1,
          "end": 7,
          "startLabel": "Not likely at all",
          "endLabel": "Extremely likely",
          "labels": {
            "1": "Not likely at all",
            "2": "Barely likely",
            "3": "Somewhat likely",
            "4": "Moderately likely",
            "5": "Very likely",
            "6": "Extremely likely",
            "7": "Certain"
          }
        }
      },
      {
        "name": "option-scale",
        "id": "general_q3",
        "attributes": {
          "label": "How important do you think it is for robots to be able to ask for human help?",
          "description": "Using a scale of 1 to 7, please rate the importance of robots being able to ask for human help, with 1 being 'Not important at all' and 7 being 'Extremely important'.",
          "required": true,
          "start": 1,
          "end": 7,
          "startLabel": "Not important at all",
          "endLabel": "Extremely important",
          "labels": {
            "1": "Not important at all",
            "2": "Barely important",
            "3": "Somewhat important",
            "4": "Moderately important",
            "5": "Very important",
            "6": "Extremely important",
            "7": "Crucial"
          }
        }
      },
      {
        "name": "statement",
        "id": "343892jsdd",
        "attributes": {
          "label": `Next you will be presented with scenarios`,
          "description":"Answer the likert questions based on each scenario, there are no right or wrong answers here. ",
          "buttonText": "Begin",
          "quotationMarks": false,
        }
      },    
      {
        "id": "scenarios_1",
        "name": "group",
        "attributes": {
          "label": "Scenario 1",
          "layout": "split-right",
          "attachment": {
            "type": "image",
            "url": "https://c.files.bbci.co.uk/221C/production/_128023780_snobot.jpg"
          },
          "description": "A delivery robot is stuck on a snowy sidewalk and cannot move."
        },
        "innerBlocks": [
          {
            "name": "option-scale",
            "id": "scenarios_1_q1",
            "attributes": {
              "label": "How likely are you to help this robot in this scenario?",
              "description": "Using a scale of 1 to 7, please rate your likelihood of helping this robot, with 1 being 'Not likely at all' and 7 being 'Extremely likely'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not likely at all",
              "endLabel": "Extremely likely",
              "labels": {
                "1": "Not likely at all",
                "2": "Slightly likely",
                "3": "Somewhat likely",
                "4": "Moderately likely",
                "5": "Very likely",
                "6": "Highly likely",
                "7": "Extremely likely"
              }
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_1_q3",
            "attributes": {
              "label": "How urgent does this task seem to you?",
              "description": "Using a scale of 1 to 7, please rate the urgency of this task, with 1 being 'Not urgent at all' and 7 being 'Extremely urgent'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not urgent at all",
              "endLabel": "Extremely urgent",
              "labels": {
                "1": "Not urgent at all",
                "2": "Slightly urgent",
                "3": "Somewhat urgent",
                "4": "Moderately urgent",
                "5": "Very urgent",
                "6": "Highly urgent",
                "7": "Extremely urgent"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_1_q4",
            "attributes": {
              "required": true,
              "label": "What aspects of the task make it seem urgent?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_1_q5",
            "attributes": {
              "label": "How important do you think this task is?",
              "description": "Using a scale of 1 to 7, please rate the importance of this task, with 1 being 'Not important at all' and 7 being 'Extremely important'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not important at all",
              "endLabel": "Extremely important",
              "labels": {
                "1": "Not important at all",
                "2": "Slightly important",
                "3": "Somewhat important",
                "4": "Moderately important",
                "5": "Very important",
                "6": "Highly important",
                "7": "Extremely important"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_1_q6",
            "attributes": {
              "required": true,
              "label": "What aspects of the task make it seem important?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_1_q7",
            "attributes": {
              "label": "How does the surrounding environment affect your decision to help the robot?",
              "description": "Using a scale of 1 to 7, please rate the influence of the environment, with 1 being 'No influence at all' and 7 being 'Extremely influential'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "No influence at all",
              "endLabel": "Extremely influential",
              "labels": {
                "1": "No influence at all",
                "2": "Slight influence",
                "3": "Somewhat influential",
                "4": "Moderately influential",
                "5": "Very influential",
                "6": "Highly influential",
                "7": "Extremely influential"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_1_q8",
            "attributes": {
              "required": true,
              "label": "What specific aspects of the environment (e.g., weather, crowd density) would influence your decision to help?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_1_q9",
            "attributes": {
              "label": "How do the appearance and behavior of the robot affect your decision to help?",
              "description": "Using a scale of 1 to 7, please rate the influence of the robot's appearance and behavior, with 1 being 'No influence at all' and 7 being 'Extremely influential'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "No influence at all",
              "endLabel": "Extremely influential",
              "labels": {
                "1": "No influence at all",
                "2": "Slight influence",
                "3": "Somewhat influential",
                "4": "Moderately influential",
                "5": "Very influential",
                "6": "Highly influential",
                "7": "Extremely influential"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_1_q10",
            "attributes": {
              "required": true,
              "label": "What specific aspects of the robot (e.g., its limitations, design) would influence your decision to help?"
            }
          }
        ]
      },
      {
        "id": "scenarios_2",
        "name": "group",
        "attributes": {
          "label": "Scenario 2",
          "layout": "split-right",
          "attachment": {
            "type": "image",
            "url": "https://i.ibb.co/2NK8ZZZ/DALL-E-2024-05-20-12-08-38-A-small-humanoid-service-robot-in-a-hospital-struggling-to-click-the-elev.png"
          },
          "description": "A robot in a hospital needs to use the elevator, but due to its height, it cannot reach the elevator button and requires assistance."
        },
        "innerBlocks": [
          {
            "name": "option-scale",
            "id": "scenarios_2_q1",
            "attributes": {
              "label": "How likely are you to help this robot in this scenario?",
              "description": "Using a scale of 1 to 7, please rate your likelihood of helping this robot, with 1 being 'Not likely at all' and 7 being 'Extremely likely'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not likely at all",
              "endLabel": "Extremely likely",
              "labels": {
                "1": "Not likely at all",
                "2": "Slightly likely",
                "3": "Somewhat likely",
                "4": "Moderately likely",
                "5": "Very likely",
                "6": "Highly likely",
                "7": "Extremely likely"
              }
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_2_q3",
            "attributes": {
              "label": "How urgent does this task seem to you?",
              "description": "Using a scale of 1 to 7, please rate the urgency of this task, with 1 being 'Not urgent at all' and 7 being 'Extremely urgent'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not urgent at all",
              "endLabel": "Extremely urgent",
              "labels": {
                "1": "Not urgent at all",
                "2": "Slightly urgent",
                "3": "Somewhat urgent",
                "4": "Moderately urgent",
                "5": "Very urgent",
                "6": "Highly urgent",
                "7": "Extremely urgent"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_2_q4",
            "attributes": {
              "required": true,
              "label": "What aspects of the task make it seem urgent?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_2_q5",
            "attributes": {
              "label": "How important do you think this task is?",
              "description": "Using a scale of 1 to 7, please rate the importance of this task, with 1 being 'Not important at all' and 7 being 'Extremely important'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not important at all",
              "endLabel": "Extremely important",
              "labels": {
                "1": "Not important at all",
                "2": "Slightly important",
                "3": "Somewhat important",
                "4": "Moderately important",
                "5": "Very important",
                "6": "Highly important",
                "7": "Extremely important"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_2_q6",
            "attributes": {
              "required": true,
              "label": "What aspects of the task make it seem important?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_2_q7",
            "attributes": {
              "label": "How does the surrounding environment affect your decision to help the robot?",
              "description": "Using a scale of 1 to 7, please rate the influence of the environment, with 1 being 'No influence at all' and 7 being 'Extremely influential'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "No influence at all",
              "endLabel": "Extremely influential",
              "labels": {
                "1": "No influence at all",
                "2": "Slight influence",
                "3": "Somewhat influential",
                "4": "Moderately influential",
                "5": "Very influential",
                "6": "Highly influential",
                "7": "Extremely influential"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_2_q8",
            "attributes": {
              "required": true,
              "label": "What specific aspects of the environment (e.g., weather, crowd density) would influence your decision to help?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_2_q9",
            "attributes": {
              "label": "How do the appearance and behavior of the robot affect your decision to help?",
              "description": "Using a scale of 1 to 7, please rate the influence of the robot's appearance and behavior, with 1 being 'No influence at all' and 7 being 'Extremely influential'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "No influence at all",
              "endLabel": "Extremely influential",
              "labels": {
                "1": "No influence at all",
                "2": "Slight influence",
                "3": "Somewhat influential",
                "4": "Moderately influential",
                "5": "Very influential",
                "6": "Highly influential",
                "7": "Extremely influential"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_2_q10",
            "attributes": {
              "required": true,
              "label": "What specific aspects of the robot (e.g., its limitations, design) would influence your decision to help?"
            }
          }
        ]
      },
      {
        "id": "scenarios_3",
        "name": "group",
        "attributes": {
          "label": "Scenario 3",
          "layout": "split-right",
          "attachment": {
            "type": "image",
            "url": "https://i.ibb.co/HNQhpW0/DALL-E-2024-05-20-12-25-50-A-robot-sorting-garbage-with-three-waste-containers-in-front-of-it-The-le.png"
          },
          "description": "A robot that sorts items into bins of plastic and glass encounters an object that it cannot identify and requires human assistance."
        },
        "innerBlocks": [
          {
            "name": "option-scale",
            "id": "scenarios_3_q1",
            "attributes": {
              "label": "How likely are you to help this robot in this scenario?",
              "description": "Using a scale of 1 to 7, please rate your likelihood of helping this robot, with 1 being 'Not likely at all' and 7 being 'Extremely likely'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not likely at all",
              "endLabel": "Extremely likely",
              "labels": {
                "1": "Not likely at all",
                "2": "Slightly likely",
                "3": "Somewhat likely",
                "4": "Moderately likely",
                "5": "Very likely",
                "6": "Highly likely",
                "7": "Extremely likely"
              }
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_3_q3",
            "attributes": {
              "label": "How urgent does this task seem to you?",
              "description": "Using a scale of 1 to 7, please rate the urgency of this task, with 1 being 'Not urgent at all' and 7 being 'Extremely urgent'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not urgent at all",
              "endLabel": "Extremely urgent",
              "labels": {
                "1": "Not urgent at all",
                "2": "Slightly urgent",
                "3": "Somewhat urgent",
                "4": "Moderately urgent",
                "5": "Very urgent",
                "6": "Highly urgent",
                "7": "Extremely urgent"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_3_q4",
            "attributes": {
              "required": true,
              "label": "What aspects of the task make it seem urgent?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_3_q5",
            "attributes": {
              "label": "How important do you think this task is?",
              "description": "Using a scale of 1 to 7, please rate the importance of this task, with 1 being 'Not important at all' and 7 being 'Extremely important'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "Not important at all",
              "endLabel": "Extremely important",
              "labels": {
                "1": "Not important at all",
                "2": "Slightly important",
                "3": "Somewhat important",
                "4": "Moderately important",
                "5": "Very important",
                "6": "Highly important",
                "7": "Extremely important"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_3_q6",
            "attributes": {
              "required": true,
              "label": "What aspects of the task make it seem important?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_3_q7",
            "attributes": {
              "label": "How does the surrounding environment affect your decision to help the robot?",
              "description": "Using a scale of 1 to 7, please rate the influence of the environment, with 1 being 'No influence at all' and 7 being 'Extremely influential'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "No influence at all",
              "endLabel": "Extremely influential",
              "labels": {
                "1": "No influence at all",
                "2": "Slight influence",
                "3": "Somewhat influential",
                "4": "Moderately influential",
                "5": "Very influential",
                "6": "Highly influential",
                "7": "Extremely influential"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_3_q8",
            "attributes": {
              "required": true,
              "label": "What specific aspects of the environment (e.g., weather, crowd density) would influence your decision to help?"
            }
          },
          {
            "name": "option-scale",
            "id": "scenarios_3_q9",
            "attributes": {
              "label": "How do the appearance and behavior of the robot affect your decision to help?",
              "description": "Using a scale of 1 to 7, please rate the influence of the robot's appearance and behavior, with 1 being 'No influence at all' and 7 being 'Extremely influential'.",
              "required": true,
              "start": 1,
              "end": 7,
              "startLabel": "No influence at all",
              "endLabel": "Extremely influential",
              "labels": {
                "1": "No influence at all",
                "2": "Slight influence",
                "3": "Somewhat influential",
                "4": "Moderately influential",
                "5": "Very influential",
                "6": "Highly influential",
                "7": "Extremely influential"
              }
            }
          },
          {
            "name": "long-text",
            "id": "scenarios_3_q10",
            "attributes": {
              "required": true,
              "label": "What specific aspects of the robot (e.g., its limitations, design) would influence your decision to help?"
            }
          }
        ]
      },
      {
        "id": "additional_questions",
        "name": "group",
        "attributes": {
          "label": "Just a couple more questions..",
          "layout": "split-right"
        },
        "innerBlocks": [
          {
            "name": "long-text",
            "id": "additional_factors",
            "attributes": {
              "required": true,
              "label": "What additional factors would make you more likely to help a robot?"
            }
          },
          {
            "name": "long-text",
            "id": "definite_help_situation",
            "attributes": {
              "required": true,
              "label": "Can you describe a situation where you would definitely help a robot?"
            }
          }
        ]
      }
      
    ]

    const postDynamicBlocks = [
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
    return [...preDynamicBlocks, ...postDynamicBlocks];
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
