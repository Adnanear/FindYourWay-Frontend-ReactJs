import '@/Styles/basic_styles.scss';
import '@/Styles/resets.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { worker } from './Mocks/browser';
import { Error } from './Pages';

if (import.meta.env.DEV) {
  worker.start({
    waitUntilReady: true,
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <ErrorBoundary
        fallback={<Error error={500} />}
        onError={(err) => {
          throw err;
        }}
      >
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
