import React, { useState } from 'react';
import LargeInput from '../SurveyComponents/LargeInput';
import Text from '../SurveyComponents/Text';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const FinishPage = ({ onComplete }) => {
  const [feedback, setFeedback] = useState({
    problems: '',
    suggestions: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [startTime, setStartTime] = useState(new Date());

  const handleInputChange = (field) => (value) => {
    setFeedback({ ...feedback, [field]: value });
  };

  const handleSubmit = () => {
    setShowThankYou(true);

    // Set a delay of 2 seconds before calling onComplete
    setTimeout(() => {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds

      // Call onComplete with feedback and time taken
      if (onComplete) {
        onComplete({ ...feedback, timeTaken });
      }
    }, 2000); // 2 seconds delay
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4 }}>
      {!showThankYou && (
        <>
          <LargeInput 
            title="Any problems you faced during the survey?" 
            onInputChange={handleInputChange('problems')} 
          />
          <LargeInput 
            title="Any suggestions for improving the survey?" 
            onInputChange={handleInputChange('suggestions')} 
          />
          <Box sx={{ mt: 4, textAlign: 'left' }}>
            <Button 
              variant="outlined"
              color="secondary"
              onClick={handleSubmit} // Fixed: Add onClick event to the button
              sx={{ marginTop: 2 }}>
              Complete
            </Button>
          </Box>
        </>
      )}

      {showThankYou && (
        <Text title="Thank You!" description="Thank you for your valuable feedback and for participating in our survey." />
      )}
    </Box>
  );
};

export default FinishPage;
