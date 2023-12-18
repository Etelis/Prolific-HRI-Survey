import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const ErrorBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffcccb',
  position: 'absolute',
  top: '0px',
  left: '0',
  right: '0',
  zIndex: 2,
  padding: '2px 10px',
  borderRadius: 4,
  color: 'red',
  textAlign: 'left',
}));

const SelectionBox = ({ title, options, onSelectionChange, error }) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (onSelectionChange) {
      onSelectionChange(event.target.value);
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
        padding: '32px 40px 40px',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        fontFamily: 'Open Sans, sans-serif',
        width: '50vw',
        maxWidth: '700px',
        margin: 'auto',
        maxHeight: '160px',
      }}
    >
      {error && (
        <ErrorBox>
          <Typography variant="" sx={{fontSize: '12px', fontWeight: 600}}>
            {error}
          </Typography>
        </ErrorBox>
      )}
      <Typography variant="" component="div" sx={{ fontWeight: 600, fontSize: '16px', padding: '0px 0px 16px' }}>
        {title}
      </Typography>
      <FormControl fullWidth variant="outlined" error={!!error}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Choose an option
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectionBox;
