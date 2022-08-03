import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './styles/scss/index.scss';

import Header from './components/elements/Header/Header';
import LeftSidebar from './components/elements/LeftSidebar/LeftSidebar';
import RightSidebar from './components/elements/RightSidebar/RightSidebar';
import Main from './components/elements/Main/Main';

function App() {
  return (
    <ErrorBoundary>
      <div className="page">
        <Header />
        <LeftSidebar />
        <RightSidebar />
        <Main />
      </div>
    </ErrorBoundary>
  );
}

export default App;
