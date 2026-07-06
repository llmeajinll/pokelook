import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router.jsx';
import { ScrollToTop } from './router/ScrollToTop.jsx';
import { SystemModeProvider, CurrencyProvider } from './hooks';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
      retry: 1, // 실패 시 1번 재시도
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SystemModeProvider>
        <CurrencyProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Router />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </CurrencyProvider>
      </SystemModeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
