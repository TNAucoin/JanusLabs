import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export const PageTitleComponent = ({ title, subtitle }) => {
  return (
    <Box mr={'auto'} mb={6}>
      <Heading
        fontWeight={350}
        fontSize={'x-large'}
        mt={4}
        mb={4}
        ml={6}
        color={'coral'}
      >
        {title}
      </Heading>
      <Text
        ml={6}
        mt={-2}
        fontSize={'sm'}
        fontWeight={200}
        fontStyle={'italic'}
        color={'gray.500'}
      >
        {subtitle}
      </Text>
    </Box>
  );
};
