import React, { useState, useEffect } from 'react';
import NumericInput from '../SurveyComponents/NumericInput';
import SelectionBox from '../SurveyComponents/SelectionBox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PersonalDetails = ({ onComplete }) => {
    const [age, setAge] = useState('');
    const [education, setEducation] = useState('');
    const [gender, setGender] = useState('');
    const [ageError, setAgeError] = useState('');
    const [educationError, setEducationError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [startTime, setStartTime] = useState(null);
  
    useEffect(() => {
      // Record the start time when the component is first rendered
      setStartTime(new Date());
    }, []);
  
    const handleNextClick = () => {
        if (!age || !education || !gender) {
          setAgeError(!age ? "Please enter your age." : "");
          setEducationError(!education ? "Please select your education level." : "");
          setGenderError(!gender ? "Please select your gender." : "");
        } else {
          const endTime = new Date();
          const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
      
          const personalDetailsData = {
            age: {
              question: "What is your age?",
              response: age
            },
            education: {
              question: "What is your highest level of education?",
              response: education
            },
            gender: {
              question: "What is your gender?",
              response: gender
            },
            timeTaken: {
              question: "Time taken to complete the Personal Details section (in seconds)",
              response: timeTaken
            }
          };
      
          onComplete(personalDetailsData);
        }
      };
      
  
    const isFormValid = () => {
      return age && education && gender && !ageError && !educationError && !genderError;
    };

  const educationOptions = [
    "No formal education",
    "Primary education",
    "Secondary education or high school",
    "Vocational qualification",
    "Bachelor's degree",
    "Master's degree",
    "Doctorate or higher",
    "Other"
  ];

  const genderOptions = ["Male", "Female", "I would rather not tell"];

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
        Personal Details
      </Typography>

      <NumericInput
        title="Age"
        range={{ min: 18, max: 120 }}
        onValueChange={(value) => setAge(value)}
        error={ageError}
      />

      <Box sx={{ my: 4 }}> {/* Increased spacing */}
        <SelectionBox
          title="Education Level"
          options={educationOptions}
          onSelectionChange={(value) => setEducation(value)}
          error={educationError}
        />
      </Box>

      <Box sx={{ my: 4 }}> {/* Increased spacing */}
        <SelectionBox
          title="Gender"
          options={genderOptions}
          onSelectionChange={(value) => setGender(value)}
          error={genderError}
        />
      </Box>

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
    </Box>
  );
};

export default PersonalDetails;
