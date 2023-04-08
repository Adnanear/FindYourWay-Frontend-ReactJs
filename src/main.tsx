import '@/Styles/basic_styles.scss';
import '@/Styles/resets.scss';
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
      {/* <ReactQueryDevtools position='bottom-right' /> */}
      <ErrorBoundary fallback={<Error error={500} />}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
