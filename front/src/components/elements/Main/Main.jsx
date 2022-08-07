import React from 'react';

import styles from './Main.module.scss';

import PostAdding from '../PostAdding/PostAdding';
import Post from '../Post/Post';

function Main() {
  // TODO: Сделать компонент ивентов
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.posts}>
          <PostAdding />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
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
