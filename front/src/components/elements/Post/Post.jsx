import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useSelector } from 'react-redux';
import { MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { url } from '../../../configs/config';
import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import CommentAdding from '../CommentAdding/CommentAdding';
import srcset from '../../../helpers/srcset';

import { convertTime, convertDateToValidFormat, convertUTCToLocal } from '../../../helpers/time';

import styles from './Post.module.scss';

import postProps from '../../../propTypes/Post/postProps';
import { deletePost, likePost } from '../../../services/posts';
import ModalImage from '../../UI/ModalImage/ModalImage';
import CommentContainer from '../../../containers/elements/Comment/CommentContainer';
import CustomMenu from '../../UI/CustomMenu/CustomMenu';

function Post({
  postId,
  userId,
  firstName,
  secondName,
  avatar,
  text,
  availability,
  creationDate,
  creationTime,
  orderedData,
  imageListCols,
  comments,
  likes
}) {
  const creationDateValidFormat = convertDateToValidFormat(new Date(creationDate));
  const { localDate, localTime } = convertUTCToLocal(creationDateValidFormat, creationTime);
  const creationMs = Date.parse(`${localDate} ${localTime}`);

  const finalCreationDate = convertTime(Date.now() - creationMs);
  const user = useSelector((state) => state.userReducer.user);

  const [openModalImage, setOpenModalImage] = React.useState(false);
  const [modalImageSrc, setModalImageSrc] = React.useState('');
  const [showAllComments, setShowAllComments] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(likes.includes(user.userId));
  const [likesCount, setLikesCount] = React.useState(likes.length);
  const [isLoading, setIsLoading] = React.useState(false);

  const textFieldRef = React.useRef(null);

  const queryClient = useQueryClient();

  const mutateHookDelete = useMutation(
    ['deletePost', postId],
    () => deletePost(postId),
    {
      onSuccess() {
        window.location.reload();
      }
    }
  );
  const mutateHookLike = useMutation(
    ['likePost', [postId, user.userId]],
    () => likePost(postId, user.userId),
    {
      onSuccess() {
        setIsLoading(false);
        queryClient.invalidateQueries('postLike');
      },
      onError(error) {
        setIsLoading(false);
        setIsLiked((prevState) => !prevState);
        setLikesCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
        console.error(error);
      }
    }
  );

  const handleDeletePost = () => {
    mutateHookDelete.mutate();
  };

  const handleLikePost = () => {
    if (isLoading) return;
    setIsLoading(true);

    setIsLiked((prevState) => !prevState);
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

    mutateHookLike.mutate();
  };

  const handleImage = (src) => {
    setModalImageSrc(src);
    setOpenModalImage(true);
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  const handleCommentClick = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  return (
    <>
      <ModalImage openModalImage={openModalImage} setOpenModalImage={setOpenModalImage} modalImageSrc={modalImageSrc} />
      <div className={styles.post}>
        <div className={styles.author}>
          <Link to={`/profile/${userId}`}>
            <img
              className={`icon ${styles.icon}`}
              src={`${url}/images/${userId === user.userId ? user.avatar : avatar}`}
              alt={`avatar-user-${userId}`}
            />
          </Link>
          <div className={styles['name-wrapper']}>
            <span className={styles.name}>
              {secondName} {firstName}
            </span>
            <div>
              <span className={styles.time}>
                {finalCreationDate}
              </span>
              <span className={styles.availability}>{availability}</span>
            </div>
          </div>
          {user.userId === userId && (
            <CustomMenu>
              <MenuItem onClick={handleDeletePost}>
                <GlobalSvgSelector id="eyeOff" />
                <p className="menu-text">Delete post</p>
              </MenuItem>
            </CustomMenu>
          )}
        </div>
        <div className={styles.text}>
          {text}
        </div>
        {orderedData && (
          <ImageList
            variant="quilted"
            cols={imageListCols}
            gap={8}
            rowHeight={75}
          >
            {orderedData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
                onClick={() => handleImage(`${url}/images/${item.img}`)}
              >
                <img
                  {...srcset(`${url}/images/${item.img}`, 100, item.rows, item.cols)}
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
            <div> {likesCount} </div>
            <div> {likesCount === 1 ? 'Like' : 'Likes'} </div>
          </div>
          <div className={styles['info-inner']}>
            <div> {comments.length} </div>
            <div> {comments.length === 1 ? 'Comment' : 'Comments'} </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={`${styles.button} ${isLiked ? styles.liked : ''}`} onClick={handleLikePost}>
            <PostSvgSelector id="like" />
            <span className={styles['button-text']}>Like</span>
          </button>
          <button type="button" className={styles.button} onClick={handleCommentClick}>
            <PostSvgSelector id="comment" />
            <span className={styles['button-text']}>Comment</span>
          </button>
        </div>
        <CommentAdding postId={postId} textFieldRef={textFieldRef} />
      </div>
      {!!comments.length && (
        <div className={styles.comments}>
          {comments.map((comment, idx) => (
            idx < 3 || showAllComments ? (
              <CommentContainer
                comment={comment}
                key={`comment-${comment.comment_id}`}
              />
            ) : null
          ))}
          {!showAllComments && comments.length > 3 && (
            <button type="button" className={styles.more} onClick={handleShowAllComments}>
              Load more
            </button>
          )}
        </div>
      )}
    </>
  );
}

Post.propTypes = postProps;

export default Post;
