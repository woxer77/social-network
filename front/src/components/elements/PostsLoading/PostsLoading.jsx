import React from 'react';
import { Skeleton } from '@mui/material';

import styles from './PostsLoading.module.scss';
import CommentAddingLoading from '../CommentAddingLoading/CommentAddingLoading';

function PostsLoading() {
  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <Skeleton variant="circular" width={50} height={50} />
        <div className={styles['name-wrapper']}>
          <Skeleton variant="text" sx={{ fontSize: '18px', width: '100%' }} />
          <div className={styles['name-wrapper-info']}>
            <Skeleton variant="text" sx={{ fontSize: '18px', width: '60%' }} />
            <Skeleton variant="text" sx={{ fontSize: '18px', width: '35%' }} />
          </div>
        </div>
        <Skeleton className={styles.ellipsis} variant="circular" width={25} height={25} />
      </div>
      <div className={styles.text}>
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
      </div>
      <Skeleton variant="rounded" sx={{ borderRadius: '4px/6.7px' }} height={230} />
      <div className={styles.info}>
        <div className={styles['liked-users']}>
          <Skeleton variant="circular" width={21} height={21} />
          <Skeleton variant="circular" width={21} height={21} />
          <Skeleton variant="circular" width={21} height={21} />
          <Skeleton variant="circular" width={21} height={21} />
        </div>
        <div className={styles['info-inner']}>
          <Skeleton variant="text" sx={{ fontSize: '18px', width: '60%' }} />
          <Skeleton variant="text" sx={{ fontSize: '18px', width: '35%' }} />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton className={styles.text} variant="text" />
        </div>
        <div className={styles.button}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton className={styles.text} variant="text" />
        </div>
        <div className={styles.button}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton className={styles.text} variant="text" />
        </div>
      </div>
      <CommentAddingLoading />
    </div>
  );
}

export default PostsLoading;
