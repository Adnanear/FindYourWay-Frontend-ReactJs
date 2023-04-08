import { styled } from '@mui/material';
import { Link as DefaultLink } from 'react-router-dom';

export const Link = styled(DefaultLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,

  ':hover, :focus-visible': {
    textDecoration: 'underline',
  },
}));
