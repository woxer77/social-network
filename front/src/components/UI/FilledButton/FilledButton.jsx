import React from 'react';

import { Button } from '@mui/material';

import buttonProps from '../../../propTypes/Button/buttonProps';

function FilledButton({ customClassName, text }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#377DFF',
        borderRadius: 2,
        textTransform: 'none',
        fontSize: 17
      }}
      className={customClassName}
    >
      {text}
    </Button>
  );
}

FilledButton.propTypes = buttonProps;

export default FilledButton;
