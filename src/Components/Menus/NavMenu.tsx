import { Stack, alpha } from '@mui/material';
import React from 'react';

interface NavMenuProps {
  children: React.ReactNode;
}

export const NavMenu: React.FC<NavMenuProps> = ({ children }) => {
  return (
    <Stack
      py={1}
      sx={{
        py: 1,

        '.navmenu-item:not(:last-child)::after': {
          content: '""',
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          height: '1px',
          width: '80%',
          bgcolor: (theme) => alpha(theme.palette.text.primary, 0.05),
        },
      }}
    >
      {children}
    </Stack>
  );
};
