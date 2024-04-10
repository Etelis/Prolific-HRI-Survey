import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ImageWithDescription = ({ imagePath, description }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (imagePath.startsWith('http')) {
      // If imagePath is a URL, set it directly
      setImageUrl(imagePath);
    } else {
      // Attempt to dynamically import the image from a local path
      import(`../images/${imagePath}`)
        .then((image) => {
          // If successful, set the imported image
          setImageUrl(image.default);
        })
        .catch((error) => {
          console.error('Failed to load image:', error);
          // Here, handle the error when local path import fails.
          // Since imagePath is not a URL, you may want to set a fallback image or handle the error differently.
        });
    }
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
        width: '100%',
        maxWidth: '700px',
        margin: 'auto',
        marginTop: '20px',
        overflow: 'hidden',
        padding: '32px 40px 40px',
      }}
    >
      {imageUrl && (
        <img src={imageUrl} alt="Descriptive" style={{ maxWidth: '100%', maxHeight: '50%'}} />
      )}
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default ImageWithDescription;
