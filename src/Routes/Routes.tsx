import { Main } from '@/Layout';
import { Clients, Error } from '@/Pages';
import { Signin } from '@/Pages/Auth/Signin';
import { Signup } from '@/Pages/Auth/Signup';
import { Orders } from '@/Pages/Dashboard/Orders/Orders';
import { Services } from '@/Pages/Dashboard/Services/Services';
import { useUserStore } from '@/Stores/useUserStore';
import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const SecuredRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<CircularProgress variant='indeterminate' />}>
            <Clients />
          </Suspense>
        ),
      },
      {
        path: 'clients',
        element: (
          <Suspense fallback={<CircularProgress variant='indeterminate' />}>
            <Clients />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<CircularProgress variant='indeterminate' />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<CircularProgress variant='indeterminate' />}>
            <Services />
          </Suspense>
        ),
      },

      // Scoped errors
      {
        path: '*',
        element: <Error error={404} />,
      },
    ],
  },
];

const PublicRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to='/auth/signin' />,
  },

  {
    path: '/auth',
    children: [
      {
        index: true,
        element: <Navigate to='signin' />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const { token } = useUserStore();

  return useRoutes([
    ...(token ? SecuredRoutes : PublicRoutes),
    ...[
      // Errors
      {
        path: '*',
        element: <Error error={404} />,
      },
    ],
  ]);
};
