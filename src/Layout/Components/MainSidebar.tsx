import { PaperContainer } from '@/Components/Containers';
import { NavMenu } from '@/Components/Menus/NavMenu';
import { NavMenuItem } from '@/Components/Menus/NavMenuItem';
import { Dvr, People, ViewStream } from '@mui/icons-material';
import React from 'react';

export const MainSidebar: React.FC = () => {
  return (
    <PaperContainer sx={{ p: 0, flexBasis: `16rem` }}>
      <NavMenu>
        <NavMenuItem icon={<People />} to='/' title='Clients' />
        <NavMenuItem icon={<Dvr />} to='/services' title='Services' />
        <NavMenuItem icon={<ViewStream />} to='/orders' title='Orders' />
      </NavMenu>
    </PaperContainer>
  );
};
