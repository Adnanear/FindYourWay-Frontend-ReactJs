import { PaperContainer } from '@/Components/Containers';
import { NavMenu } from '@/Components/Menus/NavMenu';
import { NavMenuItem } from '@/Components/Menus/NavMenuItem';
import { Dashboard, Dvr, People, ViewStream } from '@mui/icons-material';
import React from 'react';

export const MainSidebar: React.FC = () => {
  return (
    <PaperContainer sx={{ p: 0, flexBasis: `16rem` }}>
      <NavMenu>
        <NavMenuItem icon={<Dashboard />} to='/' title='Overview' />
        <NavMenuItem icon={<People />} to='/users' title='Users' />
        <NavMenuItem icon={<Dvr />} to='/products' title='Products' />
        <NavMenuItem icon={<ViewStream />} to='/orders' title='Orders' />
      </NavMenu>
    </PaperContainer>
  );
};
