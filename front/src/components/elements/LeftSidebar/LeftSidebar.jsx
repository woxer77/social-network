import React from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from 'react-query';
import styles from './LeftSidebar.module.scss';

import LeftSidebarSvgSelector from '../../../assets/images/icons/left-sidebar/LeftSidebarSvgSelector';
import { logout } from '../../../services/auth';
import { persistor } from '../../../redux/store';

function LeftSidebar() {
  const navItems = [
    { name: 'Feed', iconId: 'feed', href: '/' },
    { name: 'My community', iconId: 'my-community', href: '/my-community' },
    { name: 'Messages', iconId: 'messages', href: '/messages' },
    { name: 'Notifications', iconId: 'notifications', href: '/notifications' },
    { name: 'Explore', iconId: 'explore', href: '/explore' },
    { name: 'Profile', iconId: 'profile', href: '/profile' },
    { name: 'Settings', iconId: 'settings', href: '/settings' },
    { name: 'Logout', iconId: 'logout', href: '/logout' }
  ];

  const mutateHook = useMutation(
    'user logout',
    () => logout(),
    {
      onSuccess() {
        localStorage.removeItem('token');
        persistor.purge();
      },
      onError(error) {
        console.log('User logout error:', error);
      }
    }
  );

  function logoutHandler() {
    mutateHook.mutate();
  }

  return (
    <aside className={styles['left-sidebar']}>
      <nav className={styles.nav}>
        <ul>
          {navItems.map((elem, idx) => (
            elem.name !== 'Logout'
              ? (
                <Link
                  className={`${styles['nav-item']} ${idx || styles['nav-item_active']}`}
                  to={elem.href}
                  key={elem.iconId}
                >
                  <LeftSidebarSvgSelector id={elem.iconId} className={styles['nav-icon']} />
                  <span className={styles['nav-text']}>{elem.name}</span>
                </Link>
              )
              : (
                <button
                  type="submit"
                  className={`${styles['nav-item']} ${idx || styles['nav-item_active']}`}
                  key={elem.iconId}
                  onClick={logoutHandler}
                >
                  <LeftSidebarSvgSelector id={elem.iconId} className={styles['nav-icon']} />
                  <span className={styles['nav-text']}>{elem.name}</span>
                </button>
              )
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default LeftSidebar;
