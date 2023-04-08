import { AppContainer, Flex } from '@/Components/Containers';
import { BoxProps } from '@mui/material';
import React from 'react';
import { MainContainer, MainHeader, MainSidebar } from './Components';

type MainProps = BoxProps;

export const Main: React.FC<MainProps> = ({ ...restProps }) => {
  return (
    <AppContainer
      {...restProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 1,
      }}
    >
      <MainHeader />
      <Flex flex={1} gap='inherit'>
        <MainSidebar />
        <MainContainer />
      </Flex>
    </AppContainer>
  );
};
