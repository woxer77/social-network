import React from 'react';

import styles from './PostAdding.module.scss';
import Input from '../../UI/Input/Input';
import FilledButton from '../../UI/FilledButton/FilledButton';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

function PostAdding() {
  return (
    <div className={styles['post-adding']}>
      <div className={styles.top}>
        <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
        <Input />
      </div>
      <div className={styles.bot}>
        <div className={styles['addition-block']}>
          <div><GlobalSvgSelector id="image" /></div>
          <span className={styles['addition-text']}>Photo/Video</span>
        </div>
        <div className={styles['addition-block']}>
          <div><GlobalSvgSelector id="happySmile" /></div>
          <span className={styles['addition-text']}>Feeling</span>
        </div>
        <FilledButton customClassName={styles.button} text="Post" />
      </div>
    </div>
  );
}

export default PostAdding;
