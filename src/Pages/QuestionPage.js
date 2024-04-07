import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageWithDescription from '../SurveyComponents/ImageWithDescription';
import RatingScale from '../SurveyComponents/RatingScale';
import LargeInput from '../SurveyComponents/LargeInput'; // If applicable
import Container from '@mui/material/Container';
import Text from '../SurveyComponents/Text';
const QuestionPage = ({ onComplete }) => {
  const [robots, setRobots] = useState([]);
  const [skills, setSkills] = useState([]);
  const [currentRobotIndex, setCurrentRobotIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0); // Consider starting at 0 to immediately show the first skill
  const [selectedRating, setSelectedRating] = useState(null);
  const [responses, setResponses] = useState([]);
  const [additionalInput, setAdditionalInput] = useState('');
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    // Async function to load robots and skills data
    const loadRobotsAndSkills = async () => {
      try {
        const robotsData = await import(`./robots.json`);
        const skillsData = await import(`./skills.json`);
        // Assuming the structure of the data is correctly imported
        setRobots(robotsData.default.categories.flatMap(category => category.robots));
        setSkills(skillsData.default.skills);
        console.log("Data loaded successfully");
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadRobotsAndSkills();
  }, []);

  useEffect(() => {
    console.log("Robots:", robots);
    console.log("Current robot index:", currentRobotIndex);
    // Add any additional checks or initializations here
  }, [robots, currentRobotIndex]);

  const handleNext = () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Logic to push current response
    if (currentSkillIndex >= 0 && currentSkillIndex < skills.length) { // Make sure it's a valid index
      const response = {
        robot: robots[currentRobotIndex],
        skill: skills[currentSkillIndex].name,
        rating: selectedRating,
        duration: duration,
        ...(additionalInput && {additionalInput: additionalInput})
      };
      setResponses([...responses, response]);
    }
  
    // Reset for the next question
    setSelectedRating(null);
    setAdditionalInput('');
    setStartTime(Date.now());
  
    // Move to the next skill or the next robot
    if (currentSkillIndex < skills.length - 1) {
      setCurrentSkillIndex(prevIndex => prevIndex + 1);
    } else if (currentRobotIndex < robots.length - 1) {
      setCurrentRobotIndex(prevIndex => prevIndex + 1);
      setCurrentSkillIndex(0); // Reset to the first skill for the new robot
    } else {
      // If finished with all robots and skills
      console.log("Completing...", responses); // Debug: Log the responses to verify
      onComplete(responses); // This should trigger any completion logic you have
    }
  };
  

  const renderCurrentQuestion = () => {
    // Check if there are skills loaded and a current skill index is set
    if (skills.length > 0 && currentSkillIndex < skills.length) {
      const skill = skills[currentSkillIndex];
      return (
        <>
          <Text
            title={`Skill: ${skill.name}`}
            description={skill.shortDescription}
            fullDescription={skill.fullDescription}
          />
          <RatingScale
            questionText="Evaluate the likelihood of the robot possessing the described skill."
            description="Rate from 1 (Unlikely) to 7 (Very Likely)."
            onValueChange={setSelectedRating}
            selectedValue={selectedRating}
            questionNumber={currentSkillIndex + 1} // Assuming each skill is treated as a separate question
            totalQuestions={skills.length}
          />
        </>
      );
    }
    return null; // Return null if conditions aren't met or data isn't loaded yet
  };
  

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4, mb: 10 }}>
        {robots.length > 0 && currentRobotIndex < robots.length && (
          <ImageWithDescription 
            imagePath={robots[currentRobotIndex].imagePath}
            description={robots[currentRobotIndex].description}
          />
        )}

        {renderCurrentQuestion()}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            disabled={selectedRating === null}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionPage;
