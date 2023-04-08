import { Main } from '@/Layout';
import { Error, Overview } from '@/Pages';
import { Signin } from '@/Pages/Auth/Signin';
import { Signup } from '@/Pages/Auth/Signup';
import { RouteObject, useRoutes } from 'react-router-dom';

const SecuredRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Overview />,
      },

      // Scoped errors
      {
        path: '*',
        element: <Error error={404} />,
      },
    ],
  },

  {
    path: '/auth',
    children: [
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

  // Errors
  {
    path: '*',
    element: <Error error={404} />,
  },
];

export const AppRoutes: React.FC = () => {
  return useRoutes(SecuredRoutes);
};
