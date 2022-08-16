import React from 'react';

import styles from './Main.module.scss';

import PostAdding from '../PostAdding/PostAdding';
import PostsContainer from '../../../containers/elements/Posts/PostsContainer';
// TODO: подумать как хранить время (часовой пояс)
// TODO: через middleware multer сделать загрузку изображений

function Main() {
  // TODO: Сделать компонент ивентов
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.posts}>
          <PostAdding />
          <PostsContainer />
        </div>
        <div className={styles.events}>
          <div>event 1</div>
          <div>event 2</div>
          <div>event 2</div>
          <div>event 2</div>
        </div>
      </div>
    </main>
  );
}

export default Main;
