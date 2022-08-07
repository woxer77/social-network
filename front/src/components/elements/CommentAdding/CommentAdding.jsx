import React from 'react';

import styles from './CommentAdding.module.scss';
import Input from '../../UI/Input/Input';
import SendButton from '../../UI/SendButton/SendButton';

function CommentAdding() {
  return (
    <div className={styles['comment-adding']}>
      <img className="icon" src="https://picsum.photos/500/300?random=1" alt="profile-icon" />
      <Input customClassName={styles['comment-input']} withButtons />
      <SendButton customClassName={styles['send-button']} />
    </div>
  );
}

export default CommentAdding;
