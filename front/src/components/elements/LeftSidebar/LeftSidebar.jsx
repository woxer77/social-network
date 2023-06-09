import React from 'react';
import { NavLink } from 'react-router-dom';

import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import styles from './LeftSidebar.module.scss';

import LeftSidebarSvgSelector from '../../../assets/images/icons/left-sidebar/LeftSidebarSvgSelector';
import { logout } from '../../../services/auth';
import { persistor } from '../../../redux/store';

function LeftSidebar() {
  const user = useSelector((state) => state.userReducer.user);

  const navItems = [
    { name: 'Feed', iconId: 'feed', href: '/' },
    { name: 'Messages', iconId: 'messages', href: '/messages' },
    { name: 'Profile', iconId: 'profile', href: `/profile/${user.userId}` },
    { name: 'Logout', iconId: 'logout', href: '/logout' }
  ];

  const mutateHook = useMutation(
    ['logout', user.userId],
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
                <NavLink
                  className={({ isActive }) => (isActive ? `${styles['nav-item']} ${styles['nav-item_active']}` : styles['nav-item'])}
                  to={elem.href}
                  key={elem.iconId}
                >
                  <LeftSidebarSvgSelector id={elem.iconId} className={styles['nav-icon']} />
                  <span className={styles['nav-text']}>{elem.name}</span>
                </NavLink>
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
