import { PageTitleComponent } from '../components/layout/PageTitleComponent.jsx';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { ValueSlider } from '../components/controls/ValueSlider.jsx';
import { DatabaseIcon } from 'lucide-react';

export const Create = () => {
  return (
    <div>
      <PageTitleComponent
        title={'Create'}
        subtitle={'Create Job Item Records'}
      />
      <Flex
        p={6}
        display={'flex'}
        wrap={'wrap'}
        flexDir={'row'}
        justifyContent={'flex-start'}
      >
        <Box borderRadius={'lg'} borderWidth={1} p={4} bg={'gray.200'}>
          <Flex flexDir={'row'} mb={4}>
            <Heading
              fontSize={'lg'}
              fontWeight={500}
              color={'gray.600'}
              mb={4}
              mr={'auto'}
            >
              Batch Create
            </Heading>
            <DatabaseIcon size={24} color={'gray'} />
          </Flex>
          <Container
            maxW={'lg'}
            bg={'gray.100'}
            p={6}
            borderRadius={'lg'}
            mb={4}
          >
            <Heading mb={8} fontSize={'sm'} mr={'auto'} color={'gray.600'}>
              Number of Job Item Records
            </Heading>
            <ValueSlider
              startValue={10}
              minValue={1}
              maxValue={100}
              step={15}
            />
          </Container>
          <Container maxW={'md'} bg={'gray.100'} p={6} borderRadius={'lg'}>
            <Heading fontSize={'sm'} color={'gray.600'}>
              Priority Level of Job Item Records
            </Heading>
            <RadioGroup defaultValue="1" mt={8}>
              <Stack spacing={4} direction="row">
                <Radio size={'sm'} value="1" colorScheme={'orange'}>
                  Random
                </Radio>
                <Radio size={'sm'} value="2" colorScheme={'orange'}>
                  None
                </Radio>
                <Radio size={'sm'} value="3" colorScheme={'orange'}>
                  Low
                </Radio>
                <Radio size={'sm'} value="4" colorScheme={'orange'}>
                  Medium
                </Radio>
                <Radio size={'sm'} value="5" colorScheme={'orange'}>
                  High
                </Radio>
              </Stack>
            </RadioGroup>
          </Container>
          <Button
            mt={8}
            size={'sm'}
            colorScheme={'orange'}
            mr={'auto'}
            width={'md'}
          >
            Commit
          </Button>
        </Box>
      </Flex>
    </div>
  );
};
