import { Components, Theme } from '@mui/material';

export const ThemeComponents: Components<Omit<Theme, 'components'>> = {
  MuiTypography: {
    defaultProps: {
      variant: 'body2',
    },
    styleOverrides: {
      root: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '1em',
      },
    },
  },

  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: '1em',
      },
    },
  },
};
