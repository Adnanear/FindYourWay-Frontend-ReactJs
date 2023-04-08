import { Flex, PaperContainer } from '@/Components/Containers';
import { Link } from '@/Components/Controllers';
import { UserAvatarGroup } from '@/Components/Utils/UserAvatarGroup';
import { Typography } from '@mui/material';
import React from 'react';

export const MainHeader: React.FC = () => {
  return (
    <PaperContainer sx={{ flexBasis: '100%', height: 'fit-content', p: '.2rem' }}>
      <Flex gap={1} alignItems='center'>
        <Link to='/'>
          <Typography
            sx={{
              fontSize: '1.25em',
              fontWeight: 600,
              color: 'text.primary',
              px: 2,
            }}
          >
            FindYourWay
          </Typography>
        </Link>

        <Flex ml='auto' alignItems='inherit'>
          <UserAvatarGroup username='Adnane Aref' role='SysAdmin' />
        </Flex>
      </Flex>
    </PaperContainer>
  );
};
