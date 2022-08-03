import React from 'react';
import styles from './LeftSidebar.module.scss';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

function LeftSidebar() {
  return (
    <aside className={styles['left-sidebar']}>
      <nav className={styles.nav}>
        <ul>
          <a className={`${styles['nav-item']} ${styles['nav-item_active']}`} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="feed" /></div>
            <span className={styles['nav-text']}>Feed</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="my-community" /></div>
            <span className={styles['nav-text']}>My community</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="messages" /></div>
            <span className={styles['nav-text']}>Messages</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="notifications" /></div>
            <span className={styles['nav-text']}>Notification</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="explore" /></div>
            <span className={styles['nav-text']}>Explore</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="profile" /></div>
            <span className={styles['nav-text']}>Profile</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="settings" /></div>
            <span className={styles['nav-text']}>Settings</span>
          </a>
          <a className={styles['nav-item']} href="#2">
            <div className={styles['nav-icon']}><GlobalSvgSelector id="logout" /></div>
            <span className={styles['nav-text']}>Logout</span>
          </a>
        </ul>
      </nav>
    </aside>
  );
}

export default LeftSidebar;
