import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Text = ({ title, description, fullDescription, buttonText, buttonDelay, onButtonClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (buttonText && buttonDelay) {
      const timer = setTimeout(() => {
        setIsButtonEnabled(true);
      }, buttonDelay);

      return () => clearTimeout(timer);
    }
  }, [buttonText, buttonDelay]);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

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
        alignItems: 'center',
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
        padding: '32px 40px 40px',
      }}
    >
      <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '16px', textAlign: 'center' }}>
        {title}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      {!isExpanded && (
        <Typography textAlign="center">
          {description}
        </Typography>
      )}
      {fullDescription && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ExpandMore
            expand={isExpanded}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      )}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Typography paragraph textAlign="center">{fullDescription}</Typography>
      </Collapse>
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
