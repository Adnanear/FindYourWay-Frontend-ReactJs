import { Box, styled } from '@mui/material';

export const AppContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const Flex = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));
