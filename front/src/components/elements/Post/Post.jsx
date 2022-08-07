import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import CommentAdding from '../CommentAdding/CommentAdding';

import styles from './Post.module.scss';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1659622067904-324d338f0f06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    rows: 4,
    cols: 1
  },
  {
    img: 'https://images.unsplash.com/photo-1638137731128-07b495f1bcb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
    rows: 2,
    cols: 1
  },
  {
    img: 'https://images.unsplash.com/photo-1659609556402-d5d1f3a90499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    rows: 2,
    cols: 1
  }/* ,
  {
    img: 'https://images.unsplash.com/photo-1659812903039-d577a4844802?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    rows: 1,
    cols: 2
  } */
];
/* TODO: в зависимости от количества изображений,
  будет меняться rows и cols каждого изображения, а также поле cols в imagelist */
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  };
}

function Post() {
  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
        <div className={styles['name-wrapper']}>
          <span className={styles.name}>
            Denis Ohrimenko
          </span>
          <div>
            <span className={styles.time}>2d ago</span>
            <span className={styles.availability}>For all</span>
          </div>
        </div>
        <GlobalSvgSelector id="ellipsis" />
      </div>
      <div className={styles.text}>
        Text of the post text of the posttext
        of the posttext of the post text of the posttext
        of the posttext of the posttext of the posttext of
        the posttext of the posttext of the posttext of the post text of the posttext
        of the posttext of the post text of the posttext
        of the posttext of the posttext of the posttext of
        the posttext of the posttext of the posttext of the post text of the posttext
        of the posttext of the post text of the posttext
        of the posttext of the posttext of the posttext of
        the posttext of the posttext of the posttext of the post text of the posttext
        of the posttext of the post text of the posttext
        of the posttext of the posttext of the posttext of
        the posttext of the posttext of the posttext of the post text of the posttext
        of the posttext of the post text of the posttext
        of the posttext of the posttext of the posttext of
        the posttext of the posttext of the posttext of the post text of the posttext
        of the posttext of the post text of the posttext
        of the posttext of the posttext of the posttext of
        the posttext of the posttext of the post
      </div>
      <ImageList
        variant="quilted"
        cols={2}
        gap={10}
        rowHeight={100}
        sx={{
          marginBottom: '20px'
        }}
      >
        {itemData.map((item) => (
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
