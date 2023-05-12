import React from 'react';

import TextField from '@mui/material/TextField';

import { InputAdornment } from '@mui/material';
import styles from './Input.module.scss';

import inputProps from '../../../propTypes/Input/inputProps';
import inputDefaultProps from '../../../propTypes/Input/inputDefaultProps';

import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';

function Input({
  customClassName, withButtons, multiline, setInputActive, ...props
}) {
  let buttons;
  if (withButtons) {
    buttons = {
      endAdornment: (
        <InputAdornment position="end">
          <PostSvgSelector id="gif" />
          <PostSvgSelector id="image" />
          <PostSvgSelector id="happySmile" />
        </InputAdornment>
      )
    };
  } else buttons = null;

  const handleActivateField = () => {
    setInputActive(true);
  };

  return (
    <TextField
      hiddenLabel
      multiline={multiline}
      onClick={handleActivateField}
      name="text"
      className={`${styles.field} ${customClassName}`}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
          fontFamily: 'inherit',
          fontWeight: 700
        },
        '& .MuiInputBase-root': { padding: '0' }
      }}
      placeholder="What's happening?"
      InputProps={buttons}
      {...props}
    />
  );
}

Input.propTypes = inputProps;
Input.defaultProps = inputDefaultProps;

export default React.memo(Input);
