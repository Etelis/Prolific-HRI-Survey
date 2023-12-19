import React, { useState, useEffect } from 'react';
import Text from '../SurveyComponents/Text';
import ImageWithDescription from '../SurveyComponents/ImageWithDescription';
import RatingScale from '../SurveyComponents/RatingScale';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ExamplePage = ({ onComplete }) => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showRatingScale, setShowRatingScale] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(new Date()); // Set the start time when the page is first rendered
  }, []);

  const description = `
Our goal in this study is to learn what will make a person help a robot.
For this purpose, we will show you several scenarios, and provide several arguments for assisting the robot.
We will ask for your feedback on how convincing each argument is in the given scenario. Meaning, how likely are you to help the robot given the argument presented.`;

  const img_desc = `For example, In this scenario, we see a robot that needs help to retrieve a book from an elevated shelf.`;

const scale_desc = `How persuasive do you find the presented argument in your decision to assist the robot?

Please rank from 1 (Not Persuasive at All) to 7 (Extremely Persuasive).
There are no right or wrong answers here. 
We really need your honest opinion.`

  const handleFirstButtonClick = () => {
    setShowFirstText(false);
    setShowImage(true);
    setShowSecondText(true);
  };

  const handleSecondButtonClick = () => {
    setShowSecondText(false);
    setShowRatingScale(true);
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleNextClick = () => {
    if (!isFormValid()) return; // Ensure the form is valid before proceeding
  
    const endTime = new Date();
    const timeTaken = (endTime - startTime); // Time taken in seconds
  
    const examplePageData = {
      rating: {
        question: "How persuasive do you find the presented argument?",
        response: selectedRating
      },
      timeTaken: timeTaken,
      // Include any other relevant data here
    };
  
    onComplete(examplePageData); // Pass the formatted data to the parent component
  };
  

  const isFormValid = () => {
    return selectedRating !== null;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4, mb: 10}}>
    <div>
      {showFirstText && (
        <Text
          title="Let's Start with an Example"
          description={description}
          buttonText="I Understand"
          buttonDelay={5000}
          onButtonClick={handleFirstButtonClick}
        />
      )}

      {showImage &&(
        <>
          <ImageWithDescription 
            imageUrl="https://i.ibb.co/j8wfcKp/fd356b40-6c6e-446a-be93-2cabbcda942c.jpg" 
            description={img_desc} 
          />
          </>
      )}
      {showSecondText && (
        <>
        <Text
            title="Let's go over some possible arguments for this scenario."
            buttonText="Let's See"
            buttonDelay={100}
            onButtonClick={handleSecondButtonClick}
          />
        </>
      )}

      {showRatingScale && (
        <>
<RatingScale
    questionText="The book is too high for the robot to reach."
    description={scale_desc}
    explanation={true}
    onValueChange={handleRatingChange}
    selectedValue={selectedRating} // Pass the selectedRating state as a prop
/>

        <Box sx={{ mt: 4, textAlign: 'left' }}>
        <Button 
          variant="outlined"
          color="secondary"
          onClick={handleNextClick} 
          disabled={!isFormValid()}
          sx={{ minHeight: '50px', minWidth: '150px', float: 'left' }}
        >
          Next
        </Button>
      </Box>
        </>
      )}

    </div>
    </Box>
  );
};

export default ExamplePage;
