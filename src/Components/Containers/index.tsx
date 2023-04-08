import { Box, alpha, styled } from '@mui/material';

export const AppContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const Flex = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const PaperContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: `0 .5em 1rem -.75em ${alpha(theme.palette.text.primary, 0.25)}`,
}));
