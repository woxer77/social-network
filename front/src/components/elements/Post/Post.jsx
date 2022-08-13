import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import CommentAdding from '../CommentAdding/CommentAdding';

import styles from './Post.module.scss';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  };
}

function Post({
  // eslint-disable-next-line react/prop-types
  authorName, text, availability, orderedData, imageListCols
}) {
  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
        <div className={styles['name-wrapper']}>
          <span className={styles.name}>
            {authorName}
          </span>
          <div>
            <span className={styles.time}>2d ago</span>
            <span className={styles.availability}>{availability}</span>
          </div>
        </div>
        <GlobalSvgSelector id="ellipsis" />
      </div>
      <div className={styles.text}>
        {text}
      </div>
      <ImageList
        variant="quilted"
        cols={imageListCols}
        gap={10}
        rowHeight={100}
        sx={{
          marginBottom: '20px'
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {orderedData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 100, item.rows, item.cols)}
              alt=""
              loading="lazy"
              className={styles.image}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className={styles.info}>
        <div> 3 Comments </div>
        <div> 5 Shares </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <GlobalSvgSelector id="like" />
          <span className={styles['button-text']}>Like</span>
        </div>
        <div className={styles.button}>
          <GlobalSvgSelector id="comment" />
          <span className={styles['button-text']}>Comments</span>
        </div>
        <div className={styles.button}>
          <GlobalSvgSelector id="share" />
          <span className={styles['button-text']}>Share</span>
        </div>
      </div>
      <CommentAdding />
    </div>
  );
}

export default Post;
