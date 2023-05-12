import React from 'react';

export function useLazyComponent(factory) {
  const LazyComponent = React.lazy(factory);
  return function Lazy(props) {
    return (
      <React.Suspense fallback={<div />}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}
