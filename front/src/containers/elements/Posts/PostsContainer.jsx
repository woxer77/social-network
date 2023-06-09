import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Posts from '../../../components/elements/Posts/Posts';
import { getPostsForUser } from '../../../services/posts';
import PostsLoading from '../../../components/elements/PostsLoading/PostsLoading';
import { getComments } from '../../../services/comments';

function PostsContainer() {
  const user = useSelector((state) => state.userReducer.user);

  const { isLoading, isError, data } = useQuery(['getPosts'], () => getPostsForUser(user.userId));
  const posts = data?.data || [];

  const postsIdArr = posts.map((obj) => obj.post_id);

  const { isLoading: isLoadingComments, isError: isErrorComments, data: commentsData } = useQuery(['getComments', postsIdArr], () => getComments(postsIdArr));
  const comments = commentsData?.data || [];

  const postsWithComments = posts.map((post) => {
    const postComments = comments.filter((comment) => comment.post_id === post.post_id);
    return { ...post, comments: postComments };
  });

  if (isLoading || isError || isLoadingComments || isErrorComments) return (<PostsLoading />);

  return (<Posts posts={postsWithComments} />);
}

export default PostsContainer;
