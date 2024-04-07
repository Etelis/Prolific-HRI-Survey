import React, { useState } from 'react';
import Text from '../SurveyComponents/Text';
import ImageWithDescription from '../SurveyComponents/ImageWithDescription';
import RatingScale from '../SurveyComponents/RatingScale';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const ExamplePage = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);
  const [startTime] = useState(new Date());

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleCompleteClick = () => {
    if (selectedRating === null) return;

    const endTime = new Date();
    const duration = endTime - startTime;

    onComplete({
      rating: {
        question: "How persuasive do you find the presented argument?",
        response: selectedRating,
      },
      duration,
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep < 3 ? currentStep + 1 : currentStep);
    if (currentStep >= 3) handleCompleteClick();
  };

  const TutorialBox = ({ text }) => (
    <Paper elevation={3} sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );

  const renderNextButton = () => (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Button
        variant="outlined" // Changed from "contained" to "outlined"
        color="secondary" // Set color to "secondary"
        onClick={handleNext}
        disabled={currentStep >= 3 && selectedRating === null} // Disabled until a rating is selected for the last step
        sx={{ mt: 2, mb: 2 }}
      >
        {currentStep < 3 ? "Next" : "Finish Example"}
      </Button>
    </Box>
  );
  

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Example Stage
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', mx: 'auto' }}>
        {currentStep === 1 && (
          <>
            <ImageWithDescription
              imagePath="robot_images/Anthropomorphic/scitos_g5.png"
              description="A Scitos-G5 Robot."
            />
            <TutorialBox text="Observe the robot image above. Note its design and features that might indicate its capabilities." />
            {renderNextButton()}
          </>
        )}
        {currentStep === 2 && (
          <>
            <Text
              title="Skill: Memory Processing and Retention"
              description="Memory processing involves the ability to store and recall information, similar to file management on a computer. This includes long-term knowledge and personal memories, often supported by tools such as notebooks or digital apps."
              fullDescription="Memory processing and retention are critical for managing and recalling needed information efficiently. Aids like notes or digital tools enhance this capability, supporting both long-term and episodic memory."
            />
            <TutorialBox text="Explore the skill highlighted above. Click to expand for a detailed description." />
            {renderNextButton()}
          </>
        )}
        {currentStep === 3 && (
          <>
            <RatingScale
              questionText="Evaluate the likelihood of the robot possessing the described skill."
              description="Rate from 1 (Unlikely) to 7 (Very Likely)."
              onValueChange={handleRatingChange}
              selectedValue={selectedRating}
              questionNumber={1}
              totalQuestions={1}
            />
            <TutorialBox text="Use the Likert scale to assess the robot's likelihood of having the described skill." />
            {renderNextButton()}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ExamplePage;
