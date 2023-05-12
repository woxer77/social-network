import React from 'react';
import './assets/styles/scss/index.scss';

import AppProviders from './AppProviders';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="page">
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </div>
  );
}

export default App;
