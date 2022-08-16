import React from 'react';

import postContainerProps from '../../../propTypes/Post/postContainerProps';
import Post from '../../../components/elements/Post/Post';

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
    default: return 0;
    }
  }
  const { dataArr: orderedData, imageListCols } = imageOrdering(imagesData);

  return (
    <Post
      postId={postId}
      userId={userId}
      text={text}
      availability={availability}
      creationDate={creationDate}
      creationTime={creationTime}
      likesNumber={likesNumber}
      commentsNumber={commentsNumber}
      orderedData={orderedData}
      imageListCols={imageListCols}
    />
  );
}

PostContainer.propTypes = postContainerProps;

export default PostContainer;
