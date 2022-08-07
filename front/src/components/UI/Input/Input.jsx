import React from 'react';

import TextField from '@mui/material/TextField';

import { InputAdornment } from '@mui/material';
import styles from './Input.module.scss';

import inputProps from '../../../propTypes/Input/inputProps';
import inputDefaultProps from '../../../propTypes/Input/inputDefaultProps';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

function Input({ customClassName, withButtons }) {
  let buttons;
  if (withButtons) {
    buttons = {
      endAdornment: (
        <InputAdornment position="end">
          <GlobalSvgSelector id="gif" />
          <GlobalSvgSelector id="image" />
          <GlobalSvgSelector id="happySmile" />
        </InputAdornment>
      )
    };
  } else buttons = null;

  return (
    <TextField
      hiddenLabel
      className={`${styles.field} ${customClassName}`}
      sx={{
        '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': { fontFamily: 'inherit', fontWeight: 600 }
      }}
      placeholder="What's happening?"
      InputProps={buttons}
    />
  );
}

Input.propTypes = inputProps;
Input.defaultProps = inputDefaultProps;

export default Input;
