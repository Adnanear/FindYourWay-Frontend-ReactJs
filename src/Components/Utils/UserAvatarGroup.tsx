import { useUserStore } from '@/Stores/useUserStore';
import { LogoutOutlined } from '@mui/icons-material';
import { Avatar, IconButton, Stack, Tooltip, Typography, darken } from '@mui/material';
import React, { useCallback } from 'react';
import { Flex } from '../Containers';

interface UserAvatarGroupProps {
  username: string;
  role: string;
  image?: string;
}

export const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({ username, role, image }) => {
  const { setToken } = useUserStore();

  const handleLogout = useCallback(() => setToken(null), []);

  return (
    <Flex
      sx={{
        alignItems: 'center',
        userSelect: 'none',
        gap: 1,
        borderRadius: (theme) => theme.shape.borderRadius,
        p: 1,
        transition: 'background-color 120ms ease',
        cursor: 'pointer',
        maxWidth: '20rem',
        overflow: 'hidden',
      }}
      tabIndex={0}
    >
      <Avatar src={image} />
      <Stack overflow='hidden'>
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {username}
        </Typography>
        <Typography variant='body2' sx={{ fontSize: '.9em', mt: '-.5em', opacity: 0.7 }}>
          {role}
        </Typography>
      </Stack>
      <Tooltip title='Logout' arrow>
        <IconButton
          onClick={handleLogout}
          sx={(theme) => ({
            ml: '.5em',
            bgcolor: theme.palette.error.main,
            color: '#ffffff',
            borderRadius: '50%',
            width: '2em',
            aspectRatio: '1 / 1',

            '&:hover, &:focus-visible': {
              bgcolor: darken(theme.palette.error.main, 0.25),
            },
          })}
        >
          <LogoutOutlined />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};
