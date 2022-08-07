import React from 'react';

import styles from './SendButton.module.scss';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

import sendButtonPropTypes from '../../../propTypes/SendButton/sendButtonPropTypes';
import sendButtonDefaultPropTypes from '../../../propTypes/SendButton/sendButtonDefaultPropTypes';

function SendButton({ customClassName }) {
  return (
    <div className={`${styles.button} ${customClassName}`}>
      <GlobalSvgSelector id="send" />
    </div>
  );
}

SendButton.propTypes = sendButtonPropTypes;
SendButton.defaultPropTypes = sendButtonDefaultPropTypes;

export default SendButton;
