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
  function convertToValidFormat(date) {
    let dd = date.getDate();
    if (dd < 10) dd = `0${dd}`;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = `0${mm}`;

    const yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }
  function postCreatedTimeAlgorithm(ms) {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    const secondsRounded = Math.floor(seconds);
    const minutesRounded = Math.floor(minutes);
    const hoursRounded = Math.floor(hours);
    const daysRounded = Math.floor(days);
    const weeksRounded = Math.floor(weeks);
    const monthsRounded = Math.floor(months);
    const yearsRounded = Math.floor(years);

    if (months >= 12) {
      if (yearsRounded === 1) return `${yearsRounded} year ago`;
      return `${yearsRounded} years ago`;
    }

    if (weeks >= 4) {
      if (monthsRounded === 1) return `${monthsRounded} month ago`;
      return `${monthsRounded} months ago`;
    }

    if (days >= 7) {
      if (weeksRounded === 1) return `${weeksRounded} week ago`;
      return `${weeksRounded} weeks ago`;
    }

    if (hours >= 24) {
      if (daysRounded === 1) return `${daysRounded} day ago`;
      return `${daysRounded} days ago`;
    }

    if (minutes >= 60) {
      if (hoursRounded === 1) return `${hoursRounded} hour ago`;
      return `${hoursRounded} hours ago`;
    }

    if (seconds >= 60) {
      if (minutesRounded === 1) return `${minutesRounded} minute ago`;
      return `${minutesRounded} minutes ago`;
    }

    if (secondsRounded === 1) return `${secondsRounded} second ago`;
    return `${secondsRounded} seconds ago`;
  }
  const creationDateMs = Date.parse(`${convertToValidFormat(new Date(creationDate))} ${creationTime}`);

  const tempUsersAvatars = ['address1', '2', '3', '4', '5']; // принимаем в пропсах
  // const filteredTempUsersAvatars = tempUsersAvatars.filter((e, idx) => idx < 3);

  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
        <div className={styles['name-wrapper']}>
          <span className={styles.name}>
            {secondName} {firstName} {likesNumber}
          </span>
          <div>
            <span className={styles.time}>
              {postCreatedTimeAlgorithm(Date.now() - creationDateMs)}
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
        <div className={styles['liked-users']}>
          {tempUsersAvatars.map((e, idx) => {
            // console.log(e); // TODO: заготовка на будущее
            if (idx === 3) {
              return (
                <div className={`icon ${styles.icon} ${styles['gray-circle']}`}>+{tempUsersAvatars.length - 3}</div>
              );
            }
            return (
              <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
            );
          })}
        </div>
        <div className={styles['info-inner']}>
          <div> {commentsNumber} Comments </div>
          <div> 5 Shares </div>
        </div>
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
