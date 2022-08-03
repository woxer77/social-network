import React from 'react';
import styles from './Main.module.scss';
import PostAdding from '../PostAdding/PostAdding';

function Main() {
  // TODO: Сделать компонент самого поста
  // TODO: Сделать компонент ивентов
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.posts}>
          <PostAdding />
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
