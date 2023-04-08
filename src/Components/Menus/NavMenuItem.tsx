import { Box, IconButton, Typography, styled } from '@mui/material';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex } from '../Containers';

const MenuListItem = styled(IconButton)(({ theme }) => ({
  borderRadius: 0,
  color: theme.palette.text.secondary,
  borderInline: '.2em solid transparent',
  fontSize: '1em',
  overflow: 'hidden',
  textAlign: 'start',
  gap: '.75em',
  alignItems: 'center',
  padding: '.5em',

  '&.active': {
    borderLeftColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

interface NavMenuItemProps {
  icon: React.ReactNode;
  to: string;
  title?: string;
}

export const NavMenuItem: React.FC<NavMenuItemProps> = ({ icon, to, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = Boolean(pathname === to);

  const handleClick = useCallback(() => {
    navigate(to);
  }, [to]);

  return (
    <Flex
      component={MenuListItem}
      title={title}
      onClick={handleClick}
      className={`navmenu-item ${active ? 'active' : ''}`}
    >
      <Box sx={{ flexShrink: 0, fontSize: '1.8em', display: 'grid', placeItems: 'center' }}>
        {icon}
      </Box>
      <Typography variant='body2' sx={{ flex: 1, fontSize: '1em', fontWeight: 400, lineHeight: 1 }}>
        {title}
      </Typography>
    </Flex>
  );
};
