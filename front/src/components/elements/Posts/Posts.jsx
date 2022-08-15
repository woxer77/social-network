import React from 'react';
import PostContainer from '../../../containers/elements/Post/PostContainer';

// eslint-disable-next-line react/prop-types
function Posts({ posts }) {
  return (
    <>
      {/* eslint-disable-next-line react/prop-types */}
      {posts.map(({
        post_id, user_id, text, availability, images
      }) => (
        <PostContainer
          postId={post_id}
          userId={user_id}
          text={text}
          availability={availability}
          imagesData={images}
          key={`postContainer-${post_id}`}
        />
      ))}
    </>
  );
}

export default Posts;
