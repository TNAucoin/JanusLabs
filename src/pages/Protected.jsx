import React from 'react';

import { usePocket } from '../contexts/PocketContext';
import { Container } from '@chakra-ui/react';

export const Protected = () => {
  const { user, logout } = usePocket();

  return (
    <Container maxW={'100%'}>
      <h1>Protected</h1>
    </Container>
  );
};
