import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const ErrorBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffcccb',
  padding: '5px 10px',
  borderRadius: '4px',
  color: 'red',
  textAlign: 'left',
  width: '50vw',
  maxWidth: '700px',
  margin: 'auto',
  marginBottom: 0,
  whiteSpace: 'pre-wrap'
}));

const explanations = {
  1: 'Not Persuasive at All',
  2: 'Very Low Persuasion',
  3: 'Low Persuasion',
  4: 'Neutral',
  5: 'Moderate Persuasion',
  6: 'High Persuasion',
  7: 'Extremely Persuasive',
};

const StyledButton = styled('button')(({ theme, selected, readOnly }) => ({
  width: 40, // Diameter of the circle
  height: 40, // Diameter of the circle
  lineHeight: '40px', // Center the number vertically
  borderRadius: '50%', // Make the button a circle
  margin: '5px',
  border: 'none', // Remove borders
  backgroundColor: selected ? '#ADD8E6' : 'transparent', // Light blue when selected
  color: selected ? 'white' : 'black',
  cursor: readOnly ? 'default' : 'pointer',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Shadow for floating effect
  outline: 'none', // Remove focus outline
  transition: 'background-color 0.3s', // Smooth transition for hover effect
  '&:hover': {
    backgroundColor: selected ? '#daedf4' : '#F8F8F8', // Less gray on hover
    whiteSpace: 'pre-wrap'
  },
}));
const customTypographyStyle = {
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: 'Open Sans, sans-serif',
};
const RatingScale = ({ 
  questionText, 
  description, 
  readOnly, 
  error, 
  onValueChange, 
  explanation, 
  selectedValue, 
  questionNumber,  // New prop for the current question number
  totalQuestions   // New prop for the total number of questions
}) => {
  const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);

  useEffect(() => {
    // Update local selected value when the prop changes
    setLocalSelectedValue(selectedValue);
  }, [selectedValue]);


  const handleButtonClick = (value) => {
    if (!readOnly) {
      setLocalSelectedValue(value);
      if (onValueChange) {
        onValueChange(value);
      }
    }
  };

  const smallTextTypographyStyle = {
    fontWeight: 'normal',
    fontSize: '12px',
    fontFamily: 'Open Sans, sans-serif',
    alignSelf: 'center',
    margin: '0 20px' // Added margin to move text further to the sides
  };
  
  return (
    <>
      {error && (
        <ErrorBox>
          <Typography variant="body2">{error}</Typography>
        </ErrorBox>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper', width: '50vw', maxWidth: '700px', padding: '32px 40px', fontFamily: 'Open Sans, sans-serif', margin: 'auto', marginTop: '20px', marginBottom: '20px', whiteSpace: 'pre-wrap'}}>
        <Typography variant="" sx={customTypographyStyle}>
          {
            `Argument: ${questionText}`}
        </Typography>
        {description && (
          <Typography variant="" sx={{ color: '#00000073', mb: 2, fontSize: '14px', fontFamily: 'Open Sans, sans-serif'}}>
            {description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, p: 1, border: '1px solid #f0f0f0', borderRadius: '4px' }}>
          <Typography variant="" sx={smallTextTypographyStyle}>
            Not Persuasive at All
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
              <StyledButton
                key={value}
                selected={localSelectedValue === value}
                onClick={() => handleButtonClick(value)}
                disabled={readOnly}
              >
                {value}
              </StyledButton>
            ))}
          </Box>
          <Typography variant="" sx={smallTextTypographyStyle}>
            Extremely Persuasive
          </Typography>
        </Box>
        <Box sx={{ height: '40px', mt: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {explanation && localSelectedValue && (
            <Typography variant="" sx={{ fontWeight: 600 }}>
              {explanations[localSelectedValue]}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RatingScale;
