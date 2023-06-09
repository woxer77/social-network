import React from 'react';

import styles from './Main.module.scss';

import PostsContainer from '../../../containers/elements/Posts/PostsContainer';
import PostAddingContainer from '../../../containers/elements/PostAdding/PostAddingContainer';
// TODO: через middleware multer сделать загрузку изображений

function Main() {
  // TODO: Сделать компонент ивентов
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.posts}>
          <PostAddingContainer />
          <div className={styles['posts-wrapper']}>
            <PostsContainer />
          </div>
        </div>
        {/* <div className={styles.events}>
          <div>event 1</div>
          <div>event 2</div>
          <div>event 2</div>
          <div>event 2</div>
        </div> */}
      </div>
    </main>
  );
}

export default Main;
