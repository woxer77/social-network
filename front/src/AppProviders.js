import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './ErrorBoundary';
import { store, persistor } from './redux/store';

import appProvidersProps from './propTypes/AppProviders/appProvidersProps';

const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = appProvidersProps;
