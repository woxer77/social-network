import React from 'react';

import Search from '../../UI/Search/Search';

import styles from './RightSidebar.module.scss';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

function RightSidebar() {
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
            {/* map function */}
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=2" alt="photo1" />
              <div className={styles.name}>Philip Sarilant</div>
              <div className={styles.status}>12 h</div>
            </div>
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=3" alt="photo2" />
              <div className={styles.name}>Frederico Melicent</div>
              <div className={styles.status}>online</div>
            </div>
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=4" alt="photo3" />
              <div className={styles.name}>Jess Philips MP</div>
              <div className={styles.status}>2 min</div>
            </div>
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=5" alt="photo5" />
              <div className={styles.name}>John Carpentry</div>
              <div className={styles.status}>5 min</div>
            </div>
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=6" alt="photo6" />
              <div className={styles.name}>John Carpentry</div>
              <div className={styles.status}>5 min</div>
            </div>
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=7" alt="photo7" />
              <div className={styles.name}>John Carpentry</div>
              <div className={styles.status}>5 min</div>
            </div>
            <div className={styles['friend-block']}>
              <img className="icon" src="https://picsum.photos/500/300?random=8" alt="photo8" />
              <div className={styles.name}>John Carpentry</div>
              <div className={styles.status}>5 min</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
