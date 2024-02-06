import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { CircleUserRound, CircuitBoard } from 'lucide-react';
import { usePocket } from '../../contexts/PocketContext.jsx';
import { AppMenu } from './AppMenu.jsx';

export default function AppBar({ appName }) {
  const { user } = usePocket();
  AppBar.propTypes = {
    appName: PropTypes.string.isRequired,
  };
  return (
    <Box>
      <Container maxW={'100%'} display={'flex'}>
        <Box display={'flex'} mt={4} ml={1}>
          <Box p={1}>
            <CircuitBoard color={'coral'} size={34} />
          </Box>
          <Heading mb={4} fontWeight={'200'}>
            {appName}
          </Heading>
        </Box>
        {user && (
          <Flex ml={'auto'} p={6}>
            <CircleUserRound />
            <Box ml="2">
              <Text fontWeight="400" fontSize={'sm'}>
                {user.email}
              </Text>
            </Box>
          </Flex>
        )}
      </Container>
      {user && <AppMenu />}
    </Box>
  );
}
