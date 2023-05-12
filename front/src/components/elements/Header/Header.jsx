import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../../UI/Search/Search';

import styles from './Header.module.scss';

function Header() {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <div className={styles.logo}>
          <Link className={styles['logo-link']} to="/">
            <div className={styles['logo-icon']}>
              <img width={32} height={32} src="/images/logo.svg" alt="logo" />
            </div>
            <span className={styles['logo-title']}> Prile </span>
          </Link>
        </div>
        <div className={styles['search-wrapper']}>
          <Search customClassName={styles.search} customPlaceholder="Search for something here" />
        </div>
        <div className={styles.profile}>
          <span className={styles['profile-name']}>
            {user.firstName} {user.secondName}
          </span>
          <img className={`icon ${styles['profile-icon']}`} src="https://picsum.photos/500/300?random=1" alt="profile-icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
