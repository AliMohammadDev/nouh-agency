import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './i18n/index.ts';

import axios from 'axios';
import { router } from './utils/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

axios.defaults.baseURL =
  import.meta.env.VITE_API || 'https://realestate-api.voom.cc/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 10,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
