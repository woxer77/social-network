import React from 'react';

import Search from '../../UI/Search/Search';

import styles from './RightSidebar.module.scss';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

function RightSidebar() {
  // TODO: friends list from api
  const friends = [
    { name: 'Philip Sarilant', avatar: 'https://picsum.photos/500/300?random=2', status: '12h' },
    { name: 'Frederico Melicent', avatar: 'https://picsum.photos/500/300?random=3', status: 'online' },
    { name: 'Jess Philips MP', avatar: 'https://picsum.photos/500/300?random=4', status: '3h' },
    { name: 'John Carpentry', avatar: 'https://picsum.photos/500/300?random=5', status: '35min' },
    { name: 'John Carpentry', avatar: 'https://picsum.photos/500/300?random=6', status: '2min' },
    { name: 'John Carpentry', avatar: 'https://picsum.photos/500/300?random=7', status: '2h' },
    { name: 'John Carpentry', avatar: 'https://picsum.photos/500/300?random=8', status: '8h' }
  ];

  return (
    <aside className={styles['right-sidebar']}>
      <div className={styles.wrapper}>
        <Search customClassName={styles.search} customPlaceholder="Search friends!" />
        <div className={styles.friends}>
          <div className={styles.top}>
            <span className={styles.title}>Friends</span>
            <div className={styles.ellipsis}><GlobalSvgSelector id="ellipsis" /></div>
          </div>
          <div className={styles.list}>
            {friends.map((friend, idx) => (
              <div className={styles['friend-block']} key={`[${idx}] ${friend.name}`}>
                <img className="icon" src={friend.avatar} alt={`${friend.name}-avatar`} />
                <div className={styles.name}>{friend.name}</div>
                <div className={styles.status}>{friend.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
