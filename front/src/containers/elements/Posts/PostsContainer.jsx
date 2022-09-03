import React from 'react';
import { useQuery } from 'react-query';
import Posts from '../../../components/elements/Posts/Posts';
import { getPosts } from './api/crud';
import PostsLoading from '../../../components/elements/PostsLoading/PostsLoading';

function PostsContainer() {
  const { isLoading, isError, data } = useQuery('getPosts', () => getPosts());
  const posts = data?.data || [];

  return (
    <>
      { (isLoading || isError) && <PostsLoading />}
      <Posts posts={posts} />
    </>
  );
}

export default PostsContainer;
