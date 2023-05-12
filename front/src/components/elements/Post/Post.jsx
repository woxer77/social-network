import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useSelector } from 'react-redux';
import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import CommentAdding from '../CommentAdding/CommentAdding';

import { convertTime, convertDateToValidFormat, convertUTCToLocal } from '../../../helpers/time';

import styles from './Post.module.scss';

import postProps from '../../../propTypes/Post/postProps';

function Post({
  postId,
  firstName,
  secondName,
  text,
  availability,
  creationDate,
  creationTime,
  likesNumber,
  commentsNumber,
  orderedData,
  imageListCols
}) {
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`
    };
  }

  const creationDateValidFormat = convertDateToValidFormat(new Date(creationDate));
  const { localDate, localTime } = convertUTCToLocal(creationDateValidFormat, creationTime);
  const creationMs = Date.parse(`${localDate} ${localTime}`);

  const finalCreationDate = convertTime(Date.now() - creationMs);
  const tempUsersAvatars = ['address1', '2', '3', '4', '5', '5', '6', '7', '8']; // принимаем в пропсах
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <img
          className={`icon ${styles.icon}`}
          src="https://picsum.photos/500/300?random=1"
          alt="photo1"
        />
        <div className={styles['name-wrapper']}>
          <span className={styles.name}>
            {secondName} {firstName} {likesNumber} {user.firstName}
          </span>
          <div>
            <span className={styles.time}>
              {finalCreationDate}
            </span>
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
          gap={8}
          rowHeight={100}
        >
          {orderedData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(item.img, 100, item.rows, item.cols)}
                alt=""
                loading="lazy"
                className={styles.image}
                key={`post-${postId}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <div className={styles.info}>
        <div className={styles['liked-users']}>
          {tempUsersAvatars.length > 3 ? tempUsersAvatars.slice(0, 4).map((e, idx) => {
            if (idx <= 2) {
              return (
                <img
                  className={`icon ${styles.icon}`}
                  src="https://picsum.photos/500/300?random=1"
                  alt="photo1"
                  key={`[${idx}]: ${e}`}
                />
              );
            }
            return (
              <div
                className={`icon ${styles.icon} ${styles['gray-circle']}`}
                key={`[${idx}]: other`}
              >+{tempUsersAvatars.length - 3}
              </div>
            );
          })
            : tempUsersAvatars.map((e, idx) => (
              <img
                className={`icon ${styles.icon}`}
                src="https://picsum.photos/500/300?random=1"
                alt="photo1"
                key={`[${idx}]: ${e}`}
              />
            ))}
        </div>
        <div className={styles['info-inner']}>
          <div> {commentsNumber} Comments </div>
          <div> 5 Shares </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <PostSvgSelector id="like" />
          <span className={styles['button-text']}>Like</span>
        </div>
        <div className={styles.button}>
          <PostSvgSelector id="comment" />
          <span className={styles['button-text']}>Comments</span>
        </div>
        <div className={styles.button}>
          <PostSvgSelector id="share" />
          <span className={styles['button-text']}>Share</span>
        </div>
      </div>
      <CommentAdding />
    </div>
  );
}

Post.propTypes = postProps;

export default Post;
