import React from 'react';

import { useQuery } from 'react-query';
import postContainerProps from '../../../propTypes/Post/postContainerProps';
import Post from '../../../components/elements/Post/Post';
import { getUserById, getUsersWhoLikedPost } from '../Users/api/crud';
import PostsLoading from '../../../components/elements/PostsLoading/PostsLoading';

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
  function imageOrdering(dataString) {
    if (dataString === null) return 0;

    const dataArr = dataString.split(',').map((src) => ({
      img: src
    }));

    const dataArrLength = dataArr.length;
    let imageListCols;

    switch (dataArrLength) {
    case 1:
      imageListCols = 1;

      dataArr[0].rows = 6;
      return { dataArr, imageListCols };
    case 2:
      imageListCols = 2;

      dataArr[0].rows = 6;

      dataArr[1].rows = 6;
      return { dataArr, imageListCols };
    case 3:
      imageListCols = 2;

      dataArr[0].rows = 6;

      dataArr[1].rows = 3;

      dataArr[2].rows = 3;
      return { dataArr, imageListCols };
    case 4:
      imageListCols = 2;

      dataArr[0].rows = 6;

      dataArr[1].rows = 2;

      dataArr[2].rows = 2;

      dataArr[3].rows = 2;
      return { dataArr, imageListCols };
    case 5:
      imageListCols = 3;

      dataArr[0].rows = 3;
      dataArr[0].cols = 2;

      dataArr[1].rows = 6;

      dataArr[2].rows = 3;

      dataArr[3].rows = 3;

      dataArr[4].rows = 2;
      dataArr[4].cols = 3;
      return { dataArr, imageListCols };
    case 6:
      imageListCols = 3;

      dataArr[0].rows = 3;

      dataArr[1].rows = 3;

      dataArr[2].rows = 3;

      dataArr[3].rows = 3;

      dataArr[4].rows = 3;

      dataArr[5].rows = 3;
      return { dataArr, imageListCols };
    case 7:
      imageListCols = 3;

      dataArr[0].rows = 2;
      dataArr[0].cols = 2;

      dataArr[1].rows = 2;

      dataArr[2].rows = 4;

      dataArr[3].rows = 4;

      dataArr[4].rows = 4;

      dataArr[5].rows = 2;

      dataArr[6].rows = 2;
      dataArr[6].cols = 2;

      return { dataArr, imageListCols };
    case 8:
      imageListCols = 3;

      dataArr[0].rows = 4;

      dataArr[1].rows = 2;

      dataArr[2].rows = 4;

      dataArr[3].rows = 2;

      dataArr[4].rows = 4;

      dataArr[5].rows = 2;

      dataArr[6].rows = 4;

      dataArr[7].rows = 2;

      return { dataArr, imageListCols };
    case 9:
      imageListCols = 3;

      dataArr[0].rows = 2;

      dataArr[1].rows = 3;

      dataArr[2].rows = 2;

      dataArr[3].rows = 3;

      dataArr[4].rows = 2;

      dataArr[5].rows = 2;

      dataArr[6].rows = 3;

      dataArr[7].rows = 2;

      dataArr[8].rows = 2;

      return { dataArr, imageListCols };
    case 10:
      imageListCols = 3;

      dataArr[0].rows = 2;
      dataArr[0].cols = 2;

      dataArr[1].rows = 2;

      dataArr[2].rows = 2;

      dataArr[3].rows = 2;

      dataArr[4].rows = 2;

      dataArr[5].rows = 2;

      dataArr[6].rows = 2;

      dataArr[7].rows = 2;

      dataArr[8].rows = 2;

      dataArr[9].rows = 2;
      dataArr[9].cols = 2;

      return { dataArr, imageListCols };
    default: return 0;
    }
  }
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

  return (
    <>
      { (userIsLoading || usersListIsLoading) && <PostsLoading />}
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
    </>
  );
}

PostContainer.propTypes = postContainerProps;

export default PostContainer;
