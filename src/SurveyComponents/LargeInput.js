import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const LargeInput = ({ title, onInputChange }) => {
  const handleInputChange = (event) => {
    if (onInputChange) {
      onInputChange(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        width: '50vw',
        maxWidth: '700px',
        padding: '32px 40px 40px',
        fontFamily: 'Open Sans, sans-serif',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <Typography variant="" sx={{color: 0x00000E8, fontWeight: 600, mb: 1, fontSize: '16px', fontFamily: 'Open Sans, sans-serif',}}>
        {title}
      </Typography>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default LargeInput;
