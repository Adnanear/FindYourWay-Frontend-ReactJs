import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Stack, Typography, alpha } from '@mui/material';
import React from 'react';
import { Flex } from '../Containers';

interface UserAvatarGroupProps {
  username: string;
  role: string;
  image?: string;
}

export const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({ username, role, image }) => {
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

        '&:hover, &:focus-visible': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        },
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
      <KeyboardArrowDownIcon sx={{ fontSize: '1.5em' }} />
    </Flex>
  );
};
