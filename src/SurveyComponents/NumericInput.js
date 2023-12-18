import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const NumericInput = ({ title, range, onValueChange }) => {
  const [inputError, setInputError] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === '' || (value >= range.min && value <= range.max)) {
      setInputError('');
      if (onValueChange) {
        onValueChange(value);
      }
    } else {
      setInputError(`Value must be between ${range.min} and ${range.max}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        position: 'relative',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        fontFamily: 'Open Sans, sans-serif',
        width: '50vw',
        maxWidth: '700px',
        margin: 'auto',
        padding: '32px 40px 40px',
      }}
    >
      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <TextField
        type="number"
        inputProps={{ min: range.min, max: range.max }}
        onChange={handleChange}
        variant="outlined"
        error={!!inputError}
        helperText={inputError}
        sx={{ width: '80%' }}
      />
    </Box>
  );
};

export default NumericInput;
