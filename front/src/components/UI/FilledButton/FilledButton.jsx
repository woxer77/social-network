import React from 'react';

import { Button } from '@mui/material';

import filledButtonProps from '../../../propTypes/FilledButton/filledButtonProps';
import filledButtonDefaultProps from '../../../propTypes/FilledButton/filledButtonDefaultProps';

function FilledButton({ customClassName, children }) {
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
      {children}
    </Button>
  );
}

FilledButton.propTypes = filledButtonProps;
FilledButton.defaultPropTypes = filledButtonDefaultProps;

export default FilledButton;
