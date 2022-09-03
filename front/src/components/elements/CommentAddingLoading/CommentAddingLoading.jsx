import React from 'react';

import { Skeleton } from '@mui/material';
import styles from './CommentAddingLoading.module.scss';

function CommentAdding() {
  return (
    <div className={styles['comment-adding']}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton className={styles['comment-input']} height={80} />
      <Skeleton className={styles['send-button']} height={80} />
    </div>
  );
}

export default CommentAdding;
