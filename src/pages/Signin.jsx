import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePocket } from '../contexts/PocketContext';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

export const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, user } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        await login(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        console.error(error);
      }
      navigate('/dashboard');
    },
    [login]
  );
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  });
  console.log('SignIn');
  return (
    <Box w={'100%'} h={'100%'} overflow={'hidden'}>
      <Center>
        <Box w={'lg'} borderWidth={'2px'} borderRadius={'lg'}>
          <Box p={'8'}>
            <Box display={'flex'} justifyContent={'center'} mb={4}>
              <Heading size={'lg'} fontStyle={'italic'} fontWeight={'300'}>
                Sign In
              </Heading>
            </Box>
            <Divider mb={'8'} />
            <Box display={'flex'} justifyContent={'center'}>
              <FormControl display={'flex-column'}>
                <Box mb={'4'}>
                  <FormLabel>Email</FormLabel>
                  <Input type={'email'} ref={emailRef} />
                </Box>
                <Box mb={'8'}>
                  <FormLabel>Password</FormLabel>
                  <Input type={'password'} ref={passwordRef} />
                </Box>
              </FormControl>
            </Box>
            <Box display={'flex'} justifyContent={'center'} mt={2}>
              <Button w={'lg'} colorScheme={'orange'} onClick={handleOnSubmit}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};
