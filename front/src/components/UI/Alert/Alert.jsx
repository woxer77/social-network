import React from 'react';

import { Alert as MuiAlert } from '@mui/material';
import styles from './Alert.module.scss';

import alertProps from '../../../propTypes/Alert/alertProps';
import alertDefaultProps from '../../../propTypes/Alert/alertDefaultProps';

function Alert({ isAlertActive, errorMessage }) {
  return (
    <div className={styles['alert-wrapper']}>
      <MuiAlert
        className={styles.alert}
        style={{
          opacity: isAlertActive ? 1 : 0
        }}
        variant="filled"
        severity="error"
      >
        {errorMessage}
      </MuiAlert>
    </div>
  );
}

Alert.propTypes = alertProps;
Alert.defaultProps = alertDefaultProps;

export default Alert;
