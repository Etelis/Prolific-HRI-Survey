import React from 'react';
import Text from '../SurveyComponents/Text';
import Box from '@mui/material/Box';

const StartPage = ({ onAgree }) => {
  const description = `
Thank you for progressing to this stage of our study.

We would like to remind you that there are no right or wrong answers here. 

We really need your honest opinion.
`;

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4, mb: 10 }}>
      <Text
        title="Important Reminder"
        description={description}
        buttonText="Proceed"
        buttonDelay={3000}
        onButtonClick={onAgree}
      />
    </Box>
  );
};

export default StartPage;
