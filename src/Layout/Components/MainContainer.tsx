import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainContainer: React.FC = () => {
  return (
    <Box component='main' flex={1}>
      <Outlet />
    </Box>
  );
};
