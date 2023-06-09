import React from 'react';

import { useSelector } from 'react-redux';
import { MenuItem } from '@mui/material';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import styles from './Comment.module.scss';

import commentProps from '../../../propTypes/Comment/commentProps';
import { deleteComment } from '../../../services/comments';
import { convertDateToValidFormat, convertTime, convertUTCToLocal } from '../../../helpers/time';
import CustomMenu from '../../UI/CustomMenu/CustomMenu';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import { url } from '../../../configs/config';

function Comment({
  commentId, creationDate, creationTime, text, user
}) {
  const creationDateValidFormat = convertDateToValidFormat(new Date(creationDate));
  const { localDate, localTime } = convertUTCToLocal(creationDateValidFormat, creationTime);
  const creationMs = Date.parse(`${localDate} ${localTime}`);

  const finalCreationDate = convertTime(Date.now() - creationMs);

  const userRedux = useSelector((state) => state.userReducer.user);

  const mutateHook = useMutation(
    ['deleteComment', commentId],
    () => deleteComment(commentId),
    {
      onSuccess() {
        window.location.reload();
      }
    }
  );

  const handleDeleteComment = () => {
    mutateHook.mutate();
  };

  return (
    <div className={styles.comment}>
      <Link to={`/profile/${user.userId}`}>
        <img
          className={`icon ${styles.icon}`}
          src={`${url}/images/${user.userId === userRedux.userId ? userRedux.avatar : user.avatar}`}
          alt={`avatar-user-${user.userId}`}
        />
      </Link>
      <div className={styles.info}>
        <div className={styles['name-wrapper']}>
          <span className={styles.name}>
            {user.secondName} {user.firstName}
          </span>
          <span className={styles.time}>
            {finalCreationDate}
          </span>
        </div>
        <div className={styles.text}>
          {text}
        </div>
        {userRedux.userId === user.userId && (
          <CustomMenu>
            <MenuItem onClick={handleDeleteComment}>
              <GlobalSvgSelector id="eyeOff" />
              <p className="menu-text">Delete comment</p>
            </MenuItem>
          </CustomMenu>
        )}
      </div>
    </div>
  );
}

Comment.propTypes = commentProps;

export default Comment;
