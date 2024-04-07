import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ImageWithDescription = ({ imagePath, description }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Dynamic import to load the image
    import(`../images/${imagePath}`)
      .then(image => {
        setImageUrl(image.default);
      })
      .catch(error => {
        console.error('Failed to load image:', error);
        // Handle the failure, possibly set a fallback image
      });
  }, [imagePath]);

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
        width: '100%', // Adjusted to take full width of the parent container
        maxWidth: '700px', // To avoid being too wide on larger screens
        margin: 'auto',
        marginTop: '20px',
        overflow: 'hidden', // To maintain the box shape
        whiteSpace: 'pre-wrap',
        padding: '32px 40px 40px',
      }}
    >
      {imageUrl && (
        <img src={imageUrl} alt="Descriptive" style={{ maxWidth: '100%', maxWidth: '50%', height: 'auto' }} />
      )}
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default ImageWithDescription;
