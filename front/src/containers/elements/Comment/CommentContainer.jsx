import React from 'react';
import { useQuery } from 'react-query';
import { getUserById } from '../../../services/users';

import Comment from '../../../components/elements/Comment/Comment';

import commentContainerProps from '../../../propTypes/Comment/commentContainerProps';

function CommentContainer({ comment }) {
  const { isLoading: userIsLoading, data: userData } = useQuery(['getUserById', comment.user_id], () => getUserById(comment.user_id));
  const user = userData?.data || {};

  comment.user = {
    userId: user.user_id,
    firstName: user.first_name,
    secondName: user.second_name,
    avatar: user.avatar
  };

  if (userIsLoading) return null;

  return (
    <Comment
      commentId={comment.comment_id}
      creationDate={comment.creation_date}
      creationTime={comment.creation_time}
      text={comment.text}
      user={comment.user}
    />
  );
}

CommentContainer.propTypes = commentContainerProps;

export default CommentContainer;
