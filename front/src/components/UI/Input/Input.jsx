import React from 'react';

import TextField from '@mui/material/TextField';

import styles from './Input.module.scss';

function Input() {
  return (
    <TextField
      hiddenLabel
      className={styles.field}
      sx={{
        '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': { fontFamily: 'inherit', fontWeight: 600 }
      }}
      placeholder="What's happening?"
    />
  );
}

export default Input;
