import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ImageWithDescription = ({ imageUrl, description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        fontFamily: 'Open Sans, sans-serif',
        width: '50vw', // Consistent with other components
        maxWidth: '700px', // To avoid being too wide on larger screens
        margin: 'auto',
        marginTop: '20px',
        overflow: 'hidden', // To maintain the box shape
        whiteSpace: 'pre-wrap',
        padding: '32px 40px 40px',
      }}
    >
      <img src={imageUrl} alt="Descriptive" style={{ width: '70%', height: 'auto'}} />
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default ImageWithDescription;
