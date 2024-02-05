import React from 'react';
import { Box, Button, Container, Flex, Stack, Text } from '@chakra-ui/react';
import { CircleUserRound } from 'lucide-react';
import { usePocket } from '../contexts/PocketContext.jsx';

export const AppMenu = () => {
  const { user } = usePocket();
  return (
    <Container maxW={'100%'}>
      <Container pb={4} borderBottomWidth={2} maxW={'100%'} display={'flex'}>
        <Stack direction="row" spacing={4}>
          <Button variant={'ghost'} size={'md'}>
            Overview
          </Button>
          <Button variant={'ghost'} size={'md'}>
            Create
          </Button>
          <Button variant={'ghost'} size={'md'}>
            Queue
          </Button>
          <Button variant={'ghost'} size={'md'}>
            Log Out
          </Button>
        </Stack>
        <Flex ml={'auto'}>
          <CircleUserRound />
          <Box ml="3">
            <Text fontWeight="bold">{user.email}</Text>
          </Box>
        </Flex>
      </Container>
    </Container>
  );
};
