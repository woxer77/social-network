import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import CommentAdding from '../CommentAdding/CommentAdding';

import styles from './Post.module.scss';
import postProps from '../../../propTypes/Post/postProps';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  };
}

function Post({
  postId,
  userId,
  text,
  availability,
  creationDate,
  creationTime,
  likesNumber,
  commentsNumber,
  orderedData,
  imageListCols
}) {
  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
        <div className={styles['name-wrapper']}>
          <span className={styles.name}>
            userId: {userId}, postId: {postId}
          </span>
          <div>
            <span className={styles.time}>{creationDate} | {creationTime}</span>
            <span className={styles.availability}>{availability}</span>
          </div>
        </div>
        <GlobalSvgSelector id="ellipsis" />
      </div>
      <div className={styles.text}>
        {text}
      </div>
      {orderedData && (
        <ImageList
          variant="quilted"
          cols={imageListCols}
          gap={10}
          rowHeight={100}
        >
          {orderedData.map((item, idx) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(item.img, 100, item.rows, item.cols)}
                alt=""
                loading="lazy"
                className={styles.image}
                key={`post-${postId}-idx-${idx}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <div className={styles.info}>
        <div> {likesNumber} Likes </div>
        <div> {commentsNumber} Comments </div>
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

Post.propTypes = postProps;

export default Post;
