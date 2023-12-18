import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Text = ({ title, description, buttonText, buttonDelay, onButtonClick }) => {
  const [isButtonEnabled, setIsButtonEnabled] = React.useState(false);

  React.useEffect(() => {
    if (buttonText && buttonDelay) {
      const timer = setTimeout(() => {
        setIsButtonEnabled(true);
      }, buttonDelay);

      return () => clearTimeout(timer);
    }
  }, [buttonText, buttonDelay]);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
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
        fontFamily: 'Open Sans, sans-serif',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        whiteSpace: 'pre-wrap',
        padding: '32px 40px 40px',
      }}
    >
      <Typography variant="" sx={{color: 0x00000E8, fontWeight: 600, mb: 1, fontSize: '16px', fontFamily: 'Open Sans, sans-serif',}}>
        {title}
      </Typography>
      <Divider />
      <Typography variant="">
        {description}
      </Typography>
      {buttonText && (
        <Button 
        variant="outlined"
        color="secondary"
          disabled={!isButtonEnabled} 
          onClick={handleButtonClick} 
          sx={{ mt: 2 }}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default Text;
