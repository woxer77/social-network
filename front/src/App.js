import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './styles/scss/index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import HomePage from './components/pages/HomePage/HomePage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="page">
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="*"
                element={
                  <div style={{ fontSize: '20px', fontWeight: '600' }}>Page not found</div>
                }
              />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </div>
  );
}

export default App;
