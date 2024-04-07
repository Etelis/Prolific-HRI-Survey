import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const FeedbackBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.dark,
  textAlign: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(2, 0),
}));

const skillExplanations = {
  1: 'Highly Unlikely',
  2: 'Mostly Unlikely',
  3: 'Somewhat Unlikely',
  4: 'Neutral - Neither likely nor unlikely',
  5: 'Somewhat Likely',
  6: 'Mostly Likely',
  7: 'Highly Likely',
};

const StyledButton = styled('button')(({ theme, selected }) => ({
  ...theme.typography.button,
  borderRadius: '50%',
  width: 40,
  height: 40,
  margin: theme.spacing(0.5),
  backgroundColor: selected ? theme.palette.primary.light : theme.palette.background.paper,
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.grey[200],
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));

const ExplanationContainer = styled('div')(({ theme }) => ({
  height: '40px', // Reserve space for the explanation text
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const RatingScale = ({
  questionText,
  description,
  readOnly,
  error,
  onValueChange,
  selectedValue,
  questionNumber,
  totalQuestions,
}) => {
  const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setLocalSelectedValue(selectedValue);
  }, [selectedValue]);

  const handleButtonClick = (value) => {
    if (!readOnly) {
      setLocalSelectedValue(value);
      setShowExplanation(true); // Toggle the explanation text visibility
      if (onValueChange) {
        onValueChange(value);
      }
    }
  };

  return (
    <>
      {error && <FeedbackBox>{error}</FeedbackBox>}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper', width: '100%', maxWidth: '700px', margin: 'auto', whiteSpace: 'pre-wrap' }}>
        <Typography sx={{ mb: 2, fontWeight: 'bold' }}>{`Skill Assessment ${questionNumber} of ${totalQuestions}: ${questionText}`}</Typography>
        {description && <Typography sx={{ color: 'text.secondary', mb: 2 }}>{description}</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {Array.from({ length: 7 }, (_, i) => (
            <StyledButton key={i + 1} selected={localSelectedValue === i + 1} onClick={() => handleButtonClick(i + 1)} disabled={readOnly}>
              {i + 1}
            </StyledButton>
          ))}
        </Box>
        <ExplanationContainer>
          {showExplanation && localSelectedValue && (
            <Typography sx={{ fontWeight: 'medium' }}>{skillExplanations[localSelectedValue]}</Typography>
          )}
        </ExplanationContainer>
      </Box>
    </>
  );
};

export default RatingScale;
