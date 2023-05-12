import React from 'react';

import { Link } from 'react-router-dom';
import styles from './HeaderAuth.module.scss';

function HeaderAuth() {
  return (
    <div className={styles.logo}>
      <Link className={styles['logo-link']} to="/">
        <div className={styles['logo-icon']}>
          <img width={32} height={32} src="/images/logo.svg" alt="logo" />
        </div>
        <span className={styles['logo-title']}> Prile </span>
      </Link>
    </div>
  );
}

export default HeaderAuth;
