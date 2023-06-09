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

  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
  },

  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'small',
    },
    styleOverrides: {
      root: {
        fontWeight: 500,
        textTransform: 'none',

        '.MuiSvgIcon-root': {
          fontSize: '1.4em !important',
        },
      },

      contained: {
        color: '#ffffff',
        boxShadow: 'none !important',
      },
    },
  },

  MuiIconButton: {
    defaultProps: {
      size: 'small',
    },

    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },

  MuiAvatar: {
    defaultProps: {
      variant: 'rounded',
    },
    styleOverrides: {
      colorDefault: {
        color: '#ffffff',
      },
    },
  },

  MuiChip: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      color: 'default',
    },

    styleOverrides: {
      root: {
        borderWidth: '2px',
        fontWeight: 500,
        textTransform: 'capitalize',
      },

      colorSuccess: {
        color: '#23b729',
        borderColor: 'currentcolor',
      },
    },
  },

  MuiAutocomplete: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        padding: 0,
      },
      input: {
        padding: '2px !important',
      },
    },
  },
};
