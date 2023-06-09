import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../../../assets/styles/scss/Auth.module.scss';
import FilledButton from '../../UI/FilledButton/FilledButton';

function EmailActivation() {
  const userEmail = useSelector((state) => state.userReducer.user.email);

  return (
    <div>
      <div className={styles['main-container']}>
        <div className={styles['form-wrapper']}>
          <p className={styles.title}>
            Check your email
          </p>
          <p className={styles.text}>
            We&apos;ve sent a link to your email adress:
            <a className="link" href={`mailto:${userEmail}`}> {userEmail}</a>
          </p>
          <Link className={styles['submit-wrapper']} to="/auth/login">
            <FilledButton customClassName={styles.submit}>Go to login form</FilledButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmailActivation;
