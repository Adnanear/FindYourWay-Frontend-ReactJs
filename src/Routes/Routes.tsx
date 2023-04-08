import { Main } from '@/Layout';
import { Error, Overview } from '@/Pages';
import { Login } from '@/Pages/Auth/Login';
import { Register } from '@/Pages/Auth/Register';
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

      {
        path: 'auth',
        element: <Login />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },

      // Errors
      {
        path: '*',
        element: <Error error={404} />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  return useRoutes(SecuredRoutes);
};
