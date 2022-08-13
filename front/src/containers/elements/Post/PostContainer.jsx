import React from 'react';

import Post from '../../../components/elements/Post/Post';

function PostContainer({
  // eslint-disable-next-line react/prop-types
  authorName, text, availability, imagesData
}) {
  //  TODO: ��� � ������� ������ ������������:
  //  ������, ����� ����� ����� ������� ����, ���-�� ������,
  //  ���-�� ���������, ���� ��������, ���-�� ��������

  // TODO: ������� ���������

  // TODO: ������� ��������� � ��������� showAllPosts, � ���������� ����� ������ �� ����
  // � ���������� �� �������� � ���������, � ������� ����� ����������� ��� �����
  // (��������� ������ ������ �����)
  function imageOrdering(dataArr) {
    const localDataArr = dataArr;
    const localDataArrLength = localDataArr.length;
    let imageListCols;

    switch (localDataArrLength) {
    case 1:
      imageListCols = 1;

      localDataArr[0].rows = 6;
      return { localDataArr, imageListCols };
    case 2:
      imageListCols = 2;

      localDataArr[0].rows = 6;

      localDataArr[1].rows = 6;
      return { localDataArr, imageListCols };
    case 3:
      imageListCols = 2;

      localDataArr[0].rows = 6;

      localDataArr[1].rows = 3;

      localDataArr[2].rows = 3;
      return { localDataArr, imageListCols };
    case 4:
      imageListCols = 2;

      localDataArr[0].rows = 6;

      localDataArr[1].rows = 2;

      localDataArr[2].rows = 2;

      localDataArr[3].rows = 2;
      return { localDataArr, imageListCols };
    case 5:
      imageListCols = 3;

      localDataArr[0].rows = 3;
      localDataArr[0].cols = 2;

      localDataArr[1].rows = 6;

      localDataArr[2].rows = 3;

      localDataArr[3].rows = 3;

      localDataArr[4].rows = 2;
      localDataArr[4].cols = 3;
      return { localDataArr, imageListCols };
    case 6:
      imageListCols = 3;

      localDataArr[0].rows = 3;

      localDataArr[1].rows = 3;

      localDataArr[2].rows = 3;

      localDataArr[3].rows = 3;

      localDataArr[4].rows = 3;

      localDataArr[5].rows = 3;
      return { localDataArr, imageListCols };
    default: return 0;
    }
  }

  const { localDataArr: orderedData, imageListCols } = imageOrdering(imagesData);

  return (
    <Post
      authorName={authorName}
      text={text}
      availability={availability}
      orderedData={orderedData}
      imageListCols={imageListCols}
    />
  );
}

export default PostContainer;
