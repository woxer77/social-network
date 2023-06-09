function imageOrdering(inputDataArr) {
  if (!inputDataArr) return 0;

  const dataArr = inputDataArr;
  const dataArrLength = inputDataArr.length;
  let imageListCols;

  switch (dataArrLength) {
  case 1:
    imageListCols = 1;

    dataArr[0].rows = 6;
    dataArr[0].cols = 1;

    return { dataArr, imageListCols };
  case 2:
    imageListCols = 2;

    dataArr[0].rows = 6;
    dataArr[0].cols = 1;

    dataArr[1].rows = 6;
    dataArr[1].cols = 1;

    return { dataArr, imageListCols };
  case 3:
    imageListCols = 2;

    dataArr[0].rows = 6;
    dataArr[0].cols = 1;

    dataArr[1].rows = 3;
    dataArr[1].cols = 1;

    dataArr[2].rows = 3;
    dataArr[2].cols = 1;

    return { dataArr, imageListCols };
  case 4:
    imageListCols = 2;

    dataArr[0].rows = 6;
    dataArr[0].cols = 1;

    dataArr[1].rows = 2;
    dataArr[1].cols = 1;

    dataArr[2].rows = 2;
    dataArr[2].cols = 1;

    dataArr[3].rows = 2;
    dataArr[3].cols = 1;

    return { dataArr, imageListCols };
  case 5:
    imageListCols = 3;

    dataArr[0].rows = 3;
    dataArr[0].cols = 2;

    dataArr[1].rows = 6;
    dataArr[1].cols = 1;

    dataArr[2].rows = 3;
    dataArr[2].cols = 1;

    dataArr[3].rows = 3;
    dataArr[3].cols = 1;

    dataArr[4].rows = 2;
    dataArr[4].cols = 3;
    return { dataArr, imageListCols };
  case 6:
    imageListCols = 3;

    dataArr[0].rows = 3;
    dataArr[0].cols = 1;

    dataArr[1].rows = 3;
    dataArr[1].cols = 1;

    dataArr[2].rows = 3;
    dataArr[2].cols = 1;

    dataArr[3].rows = 3;
    dataArr[3].cols = 1;

    dataArr[4].rows = 3;
    dataArr[4].cols = 1;

    dataArr[5].rows = 3;
    dataArr[5].cols = 1;
    return { dataArr, imageListCols };
  case 7:
    imageListCols = 3;

    dataArr[0].rows = 2;
    dataArr[0].cols = 2;

    dataArr[1].rows = 2;
    dataArr[1].cols = 1;

    dataArr[2].rows = 4;
    dataArr[2].cols = 1;

    dataArr[3].rows = 4;
    dataArr[3].cols = 1;

    dataArr[4].rows = 4;
    dataArr[4].cols = 1;

    dataArr[5].rows = 2;
    dataArr[5].cols = 1;

    dataArr[6].rows = 2;
    dataArr[6].cols = 2;

    return { dataArr, imageListCols };
  case 8:
    imageListCols = 3;

    dataArr[0].rows = 4;
    dataArr[0].cols = 1;

    dataArr[1].rows = 2;
    dataArr[1].cols = 1;

    dataArr[2].rows = 4;
    dataArr[2].cols = 1;

    dataArr[3].rows = 2;
    dataArr[3].cols = 1;

    dataArr[4].rows = 4;
    dataArr[4].cols = 1;

    dataArr[5].rows = 2;
    dataArr[5].cols = 1;

    dataArr[6].rows = 4;
    dataArr[6].cols = 1;

    dataArr[7].rows = 2;
    dataArr[7].cols = 1;

    return { dataArr, imageListCols };
  default: return 0;
  }
}

export default imageOrdering;
