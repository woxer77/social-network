import React from 'react';

import { Button } from '@mui/material';

import filledButtonProps from '../../../propTypes/FilledButton/filledButtonProps';
import filledButtonDefaultProps from '../../../propTypes/FilledButton/filledButtonDefaultProps';

function FilledButton({ children, customClassName, ...props }) {
  return (
    <Button
      variant="contained"
      type="submit"
      sx={{
        backgroundColor: '#377DFF',
        borderRadius: 2,
        textTransform: 'none',
        fontSize: 18,
        lineHeight: 'normal',
        fontFamily: 'inherit',
        fontWeight: 400,
        padding: '0 0'
      }}
      className={customClassName}
      {...props}
    >
      {children}
    </Button>
  );
}

FilledButton.propTypes = filledButtonProps;
FilledButton.defaultPropTypes = filledButtonDefaultProps;

export default React.memo(FilledButton);
