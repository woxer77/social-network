import React from 'react';

import styles from './SendButton.module.scss';

import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';

import sendButtonPropTypes from '../../../propTypes/SendButton/sendButtonPropTypes';
import sendButtonDefaultPropTypes from '../../../propTypes/SendButton/sendButtonDefaultPropTypes';

function SendButton({ customClassName }) {
  return (
    <div className={`${styles.button} ${customClassName}`}>
      <PostSvgSelector id="send" />
    </div>
  );
}

SendButton.propTypes = sendButtonPropTypes;
SendButton.defaultPropTypes = sendButtonDefaultPropTypes;

export default React.memo(SendButton);
