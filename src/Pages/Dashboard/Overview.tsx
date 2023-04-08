import { Flex, PaperContainer } from '@/Components/Containers';
import React from 'react';

export const Overview: React.FC = () => {
  return (
    <Flex sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <PaperContainer sx={{ width: 'clamp(25rem, 50vw, 30rem)' }}>
        <h1>Welcome home!</h1>
      </PaperContainer>
    </Flex>
  );
};
