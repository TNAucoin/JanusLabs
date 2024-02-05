import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Heading } from '@chakra-ui/react';
import { AppMenu } from '../AppMenu.jsx';
import { CircuitBoard } from 'lucide-react';

export default function AppBar({ appName }, props) {
  AppBar.propTypes = {
    appName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  return (
    <Box>
      <Container maxW="large" centerContent p={4} maxH={8}>
        <Box maxW="sm" display={'flex'} alignItems={'baseline'}>
          <Box mr={2}>
            <CircuitBoard color={'coral'} size={32} />
          </Box>
          <Heading mb={4} fontStyle={'oblique'} fontWeight={'200'}>
            {appName}
          </Heading>
        </Box>
      </Container>
      <AppMenu />
      <Container maxW={'lg'}>{props.children}</Container>
    </Box>
  );
}
