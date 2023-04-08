import { AppContainer } from '@/Components/Containers';
import { BoxProps } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

type MainProps = BoxProps;

export const Main: React.FC<MainProps> = ({ ...restProps }) => {
  return (
    <AppContainer {...restProps}>
      <Outlet />
    </AppContainer>
  );
};
