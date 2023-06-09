import React from 'react';

import styles from './SendButton.module.scss';

import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';

import sendButtonPropTypes from '../../../propTypes/SendButton/sendButtonPropTypes';
import sendButtonDefaultPropTypes from '../../../propTypes/SendButton/sendButtonDefaultPropTypes';

function SendButton({ customClassName, ...props }) {
  return (
    <button type="submit" className={`${styles.button} ${customClassName}`} {...props}>
      <PostSvgSelector id="send" />
    </button>
  );
}

SendButton.propTypes = sendButtonPropTypes;
SendButton.defaultPropTypes = sendButtonDefaultPropTypes;

export default React.memo(SendButton);
