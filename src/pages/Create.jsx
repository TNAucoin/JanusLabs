import { PageTitleComponent } from '../components/layout/PageTitleComponent.jsx';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  SlideFade,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ValueSlider } from '../components/controls/ValueSlider.jsx';
import { DatabaseIcon } from 'lucide-react';
import { useJanus } from '../contexts/JanusContext.jsx';
import { useEffect, useState } from 'react';

export const Create = () => {
  const { createJob } = useJanus();
  const [jobAmount, setJobAmount] = useState(10);
  const [finishedJobs, setFinishedJobs] = useState(0);
  const [finishedJobData, setFinishedJobData] = useState([]);
  const [priority, setPriority] = useState('1');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Clear finishedJobData when jobAmount changes
    setFinishedJobData([]);
  }, [jobAmount]);
  const createJobRequests = () => {
    let requests = [];
    if (priority === '1') {
      // return random priority from 2-5
      requests = Array.from({ length: jobAmount }, () => {
        let val = Math.floor(Math.random() * 4) + 2;
        let p = convertPriority(val.toString());
        return { job: createJob(p), priority: val };
      });
    } else {
      requests = Array.from({ length: jobAmount }, () => ({
        job: createJob(convertPriority(priority)),
        priority: priority,
      }));
    }
    return requests;
  };
  const convertPriority = priority => {
    switch (priority) {
      case '1':
        return 'RANDOM';
      case '2':
        return 'NONE';
      case '3':
        return 'LOW';
      case '4':
        return 'MEDIUM';
      case '5':
        return 'HIGH';
    }
  };

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const handleCreateJob = async evt => {
    evt.preventDefault();
    setFinishedJobData([{}]);
    let jobs = createJobRequests().map((job, index) => {
      return job.job.then(
        result =>
          delay(300).then(() => {
            setFinishedJobData(prev => [
              ...prev,
              { id: result.data.job_id, priority: job.priority },
            ]);
            setFinishedJobs(prevFinishedJobs => prevFinishedJobs + 1);
          }),
        error => Promise.reject(error)
      );
    });
    try {
      setLoading(true);
      await Promise.all(jobs);
      setLoading(false);
      setFinishedJobs(0);
    } catch (error) {
      console.error('Error', error);
    }
  };
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
        <Box
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          borderBottomLeftRadius={'lg'}
          borderTopLeftRadius={'lg'}
          borderWidth={1}
          p={4}
          bg={'gray.200'}
        >
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
              value={jobAmount}
              setValue={setJobAmount}
              startValue={jobAmount}
              minValue={1}
              maxValue={100}
              step={15}
            />
          </Container>
          <Container maxW={'md'} bg={'gray.100'} p={6} borderRadius={'lg'}>
            <Heading fontSize={'sm'} color={'gray.600'}>
              Priority Level of Job Item Records
            </Heading>
            <RadioGroup defaultValue={priority} mt={8} onChange={setPriority}>
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
          <SlideFade in={loading} offsetY={20}>
            <Progress
              mt={4}
              value={(finishedJobs / jobAmount) * 100}
              borderRadius={'lg'}
              isAnimated
              hasStripe
            />
          </SlideFade>
          <Button
            mt={2}
            size={'sm'}
            colorScheme={'orange'}
            mr={'auto'}
            width={'md'}
            onClick={handleCreateJob}
            isLoading={loading}
          >
            Commit
          </Button>
        </Box>
        <SlideFade offsetX={-80} offsetY={0} in={finishedJobData.length > 0}>
          <div>
            <TableContainer
              boxSize={'lg'}
              overflowY={'auto'}
              overflowX={'hidden'}
              maxH={416}
              bg={'gray.100'}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              borderTopRightRadius={'lg'}
              borderBottomRightRadius={'lg'}
              borderTopWidth={3}
              borderBottomWidth={3}
              borderRightWidth={3}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Priority</Th>
                    <Th>Job-ID</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {finishedJobData.map((job, index) => (
                    <Tr key={index}>
                      <Td>{convertPriority(job.priority?.toString())}</Td>
                      <Td color={'blue'}>{job.id}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </SlideFade>
      </Flex>
    </div>
  );
};
