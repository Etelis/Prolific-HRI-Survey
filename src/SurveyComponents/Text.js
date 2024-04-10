import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icon for accordion expansion

const TextComponent = ({
  title,
  description,
  fullDescription = '',
  examples,
  buttonText,
  onButtonClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper', width: '50vw', maxWidth: '700px', margin: 'auto', padding: '32px 40px 40px' }}>
      <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>{title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>{description}</Typography>
      {fullDescription && (
        <Accordion expanded={expanded === 'panelFullDescription'} onChange={handleChange('panelFullDescription')} sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ color: 'lightgray' }}>Full Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{fullDescription}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
      <Divider sx={{ my: 1 }} />
      {examples && examples.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: 'lightgray', mb: 1, textAlign: 'left' }}>Explanations</Typography>
          {examples.map((example, index) => (
            <Accordion key={`example-${index}`} expanded={expanded === `examplePanel${index}`} onChange={handleChange(`examplePanel${index}`)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{example.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{example.text}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
      {buttonText && (
        <Button variant="outlined" color="primary" disabled={false} onClick={onButtonClick} sx={{ mt: 2 }}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default TextComponent;
