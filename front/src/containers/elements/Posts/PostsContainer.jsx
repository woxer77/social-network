import React from 'react';
import { useQuery } from 'react-query';
import Posts from '../../../components/elements/Posts/Posts';
import { getPosts } from './api/crud';

function PostsContainer() {
  const { isLoading, data } = useQuery('getPosts', () => getPosts());
  const posts = data?.data || [];

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <Posts posts={posts} />
    </>
  );
}

export default PostsContainer;
