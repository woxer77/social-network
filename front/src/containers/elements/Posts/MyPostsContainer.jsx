import React from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Posts from '../../../components/elements/Posts/Posts';
import PostsLoading from '../../../components/elements/PostsLoading/PostsLoading';
import { getComments } from '../../../services/comments';
import { getPostsOfUser } from '../../../services/posts';

function MyPostsContainer({ userId }) {
  const user = useSelector(state => state.userReducer.user);

  const { isLoading, isError, data } = useQuery(['getPostsOfUser', userId], () =>
    getPostsOfUser(userId)
  );
  const posts = data?.data || [];

  const postsForViewingUser = posts.filter(
    post => post.availability_list.includes(user.userId) || post.availability_list.length === 0
  );

  const postsIdArr = postsForViewingUser.map(obj => obj.post_id);

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: commentsData
  } = useQuery(['getComments', postsIdArr], () => getComments(postsIdArr));
  const comments = commentsData?.data || [];

  const postsWithComments = postsForViewingUser.map(post => {
    const postComments = comments.filter(comment => comment.post_id === post.post_id);
    return { ...post, comments: postComments };
  });

  if (isLoading || isError || isLoadingComments || isErrorComments) return <PostsLoading />;

  return <Posts posts={postsWithComments} />;
}

MyPostsContainer.propTypes = {
  userId: PropTypes.number.isRequired
};

export default MyPostsContainer;
