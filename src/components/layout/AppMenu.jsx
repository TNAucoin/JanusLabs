import React from 'react';
import { Button, Container, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { usePocket } from '../../contexts/PocketContext.jsx';

export const AppMenu = () => {
  const navigate = useNavigate();
  const { logout } = usePocket();
  const handleLogout = evt => {
    evt.preventDefault();
    console.log('Logging out');
    logout();
  };
  const handleDashboard = evt => {
    evt.preventDefault();
    navigate('/dashboard');
  };
  const handleCreate = evt => {
    evt.preventDefault();
    navigate('/create');
  };
  const handleQueue = evt => {
    evt.preventDefault();
    navigate('/queue');
  };

  return (
    <Container pb={2} borderBottomWidth={2} maxW={'100%'} display={'flex'}>
      <Stack direction="row" spacing={4}>
        <Button variant={'ghost'} size={'sm'} onClick={handleDashboard}>
          Dashboard
        </Button>
        <Button variant={'ghost'} size={'sm'} onClick={handleCreate}>
          Create
        </Button>
        <Button variant={'ghost'} size={'sm'} onClick={handleQueue}>
          Queue
        </Button>
        <Button variant={'ghost'} size={'sm'} onClick={handleLogout}>
          Log Out
        </Button>
      </Stack>
    </Container>
  );
};
