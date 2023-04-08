import { Components, Theme } from '@mui/material';

export const ThemeComponents: Components<Omit<Theme, 'components'>> = {
  MuiTypography: {
    defaultProps: {
      variant: 'body1',
    },
    styleOverrides: {
      root: {
        fontSize: '1em',
      },

      h1: {
        fontSize: '1.8em',
        fontWeight: 600,
      },

      body2: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
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

  MuiFormHelperText: {
    defaultProps: {
      variant: 'standard',
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },

  MuiInputBase: {
    styleOverrides: {
      input: {
        padding: '.5em .75em !important',
      },
    },
  },

  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableTouchRipple: true,
      disableElevation: true,
      disableFocusRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        fontWeight: 500,
        textTransform: 'none',

        '.MuiSvgIcon-root': {
          fontSize: '1.1em !important',
        },
      },

      contained: {
        color: '#ffffff',
        boxShadow: 'none',
      },
    },
  },
};
