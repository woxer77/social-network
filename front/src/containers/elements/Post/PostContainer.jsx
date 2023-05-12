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
  likesNumber,
  commentsNumber,
  imagesData
}) {
  const { dataArr: orderedData, imageListCols } = imageOrdering(imagesData);

  const { isLoading: userIsLoading, data: userData } = useQuery(`getUserById/${userId}`, () => getUserById(userId));
  const user = userData?.data || {};

  const { isLoading: usersListIsLoading, data: usersListData } = useQuery(`getUsersWhoLikedPost/${postId}`, () => getUsersWhoLikedPost(postId));
  // eslint-disable-next-line no-unused-vars
  const usersWhoLikedPost = usersListData?.data.map((e) => e.user_id) || [];

  /* const { isLoading: usersAvatarsIsLoading, data: usersAvatarsData } = useQuery(`getUsersAvatars/${usersWhoLikedPost}`, () => getUsersAvatars(usersWhoLikedPost));
  const usersAvatars = usersAvatarsData?.data || []; */
  // TODO: делать следующее после того, как будет готов функционал загрузки/выгрузки изображений с помощью multer:
  // TODO: доставать из базы от 1 до 4 аватаров (в зависимости от размера массива usersWhoLikedPost, с помощью select ... whereIn('id', [1, 2, 3]))
  // TODO: после отрисовывать эти 1-4 аватаров в компоненте Post, а если их больше 4 - делать доп. кружок с цифрой оставшихся юзеров, которые лайкнули пост

  if (userIsLoading || usersListIsLoading) return (<PostsLoading />);
  return (
    <Post
      postId={postId}
      firstName={user.first_name}
      secondName={user.second_name}
      text={text}
      availability={availability}
      creationDate={creationDate}
      creationTime={creationTime}
      likesNumber={likesNumber}
      commentsNumber={commentsNumber}
      orderedData={orderedData}
      imageListCols={imageListCols}
      key={`post-${postId}`}
    />
  );
}

PostContainer.propTypes = postContainerProps;

export default PostContainer;
