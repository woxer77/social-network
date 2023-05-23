import React from 'react';

import Header from '../../elements/Header/Header';
import LeftSidebar from '../../elements/LeftSidebar/LeftSidebar';
import RightSidebar from '../../elements/RightSidebar/RightSidebar';
import Main from '../../elements/Main/Main';

function Home() {
  return (
    <>
      <Header />
      <LeftSidebar />
      <RightSidebar />
      <Main />
    </>
  );
}

export default Home;
