import React from 'react';

import { useQuery } from 'react-query';
import postContainerProps from '../../../propTypes/Post/postContainerProps';
import Post from '../../../components/elements/Post/Post';
import { getUserById, getUsersWhoLikedPost } from '../../../services/users';
import PostsLoading from '../../../components/elements/PostsLoading/PostsLoading';

import imageOrdering from '../../../helpers/imageOrdering';

function PostContainer({
  postId,
  userId,
  text,
  availability,
  creationDate,
  creationTime,
  imagesData,
  comments
}) {
  const dataArr = imagesData !== '' ? imagesData.split(',').map((src) => ({
    img: src
  })) : [];
  const { dataArr: orderedData, imageListCols } = imageOrdering(dataArr);

  const { isLoading: userIsLoading, data: userData } = useQuery(['getUserById', userId], () => getUserById(userId));
  const user = userData?.data || {};

  const { isLoading: postLikesIsLoading, data: postLikes } = useQuery(['getUsersWhoLikedPost', postId], () => getUsersWhoLikedPost(postId));
  const usersId = postLikes?.data || {};

  if (userIsLoading || postLikesIsLoading) return (<PostsLoading />);
  return (
    <Post
      postId={postId}
      userId={userId}
      firstName={user.first_name}
      secondName={user.second_name}
      avatar={user.avatar}
      text={text}
      availability={availability}
      creationDate={creationDate}
      creationTime={creationTime}
      orderedData={orderedData}
      imageListCols={imageListCols}
      comments={comments}
      likes={usersId}
      key={`post-${postId}`}
    />
  );
}

PostContainer.propTypes = postContainerProps;

export default PostContainer;
