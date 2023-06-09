import React from 'react';

import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../../UI/Search/Search';

import styles from './RightSidebar.module.scss';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import { getUsersByIds } from '../../../services/users';
import { url } from '../../../configs/config';

function RightSidebar() {
  const user = useSelector((state) => state.userReducer.user);

  const { data } = useQuery(['getUsersByIds', user.following], () => getUsersByIds(user.following));
  const following = data?.data || [];

  let content;
  if (user.following.length !== 0) {
    content = following.map((person) => (
      <Link to={`/profile/${person.userId}`} key={`${user.userId}-following-${person.userId}`}>
        <div className={styles['following-block']}>
          <img className="icon" src={`${url}/images/${person.avatar}`} alt={`${person.userId}-avatar`} />
          <div className={styles.name}>{person.firstName} {person.secondName}</div>
        </div>
      </Link>
    ));
  } else {
    content = <div className={styles['no-following']}>You don&apos;t follow anyone &#x1F61E;</div>;
  }

  return (
    <aside className={styles['right-sidebar']}>
      <div className={styles.wrapper}>
        <Search customClassName={styles.search} customPlaceholder="Search people!" />
        <div className={styles.following}>
          <div className={styles.top}>
            <span className={styles.title}>You are following</span>
            <div className={styles.ellipsis}><GlobalSvgSelector id="ellipsis" /></div>
          </div>
          <div className={styles.list}>
            {content}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
