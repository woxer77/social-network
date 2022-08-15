import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './styles/scss/index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import HomePage from './components/pages/HomePage/HomePage';
import PageNotFound from './components/elements/PageNotFound/PageNotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="page">
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </div>
  );
}

export default App;
