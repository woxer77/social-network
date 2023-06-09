import React from 'react';
import PostContainer from '../../../containers/elements/Post/PostContainer';
import postsProps from '../../../propTypes/Posts/postsProps';

function Posts({ posts }) {
  return (
    <>
      {posts.map(({
        post_id,
        user_id,
        text,
        availability,
        creation_date,
        creation_time,
        images,
        comments
      }) => (
        <PostContainer
          postId={post_id}
          userId={user_id}
          text={text}
          availability={availability}
          creationDate={creation_date}
          creationTime={creation_time}
          imagesData={images}
          comments={comments}
          key={`postContainer-${post_id}`}
        />
      ))}
    </>
  );
}

Posts.propTypes = postsProps;

export default Posts;
