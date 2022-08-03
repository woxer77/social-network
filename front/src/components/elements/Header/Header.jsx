import React from 'react';
import Search from '../../UI/Search/Search';

import styles from './Header.module.scss';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <a className={styles.logo} href="#1">
          <div className={styles['logo-icon']}><GlobalSvgSelector id="logo" /></div>
          <span className={styles['logo-title']}> Prile </span>
        </a>
        <div className={styles['search-wrapper']}>
          <Search customClassName={styles.search} customPlaceholder="Search for something here" />
        </div>
        <div className={styles.profile}>
          <span className={styles['profile-name']}>
            Denis Ohrimenko
          </span>
          <img className={`icon ${styles['profile-icon']}`} src="https://picsum.photos/500/300?random=1" alt="profile-icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
