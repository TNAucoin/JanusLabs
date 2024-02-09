import React, { useCallback, useEffect, useState } from 'react';
import { PageTitleComponent } from '../components/layout/PageTitleComponent.jsx';
import { usePocket } from '../contexts/PocketContext.jsx';
import { QueueGrid } from '../components/controls/QueueGrid.jsx';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { useJanus } from '../contexts/JanusContext.jsx';

export const Queue = () => {
  console.log('Queue');
  const { pb } = usePocket();
  const { enqueueJob } = useJanus();
  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  // realtime

  const queryRecords = useCallback(async () => {
    const r = await pb.collection('job_system_info').getFullList({
      requestKey: null,
    });
    console.log(r);
    console.log('records loaded');
    return r;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await queryRecords();
        setRecords(data);
      } catch (err) {
        console.error(err);
      }
    };
    const setupRealtime = async () => {
      try {
        console.log('setting up realtime');
        await pb.collection('job_system_info').subscribe('*', function (e) {
          if (e.action === 'delete') {
            console.log('delete');
            const newRecords = records.filter(r => r.id !== e.record.id);
            setRecords(newRecords);
          }
          if (e.action === 'insert') {
            console.log('insert');
            setRecords([...records, e.record]);
          }
          if (e.action === 'update') {
            console.log('update');
            const newRecords = records.map(r => {
              if (r.id === e.record.id) {
                return e.record;
              }
              return r;
            });
            setRecords(newRecords);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    setupRealtime();
    fetchData();
  }, []);
  const handleRefresh = async evt => {
    evt.preventDefault();
    try {
      const data = await queryRecords();
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleEnqueue = async evt => {
    evt.preventDefault();
    try {
      await enqueueJob(selectedRecords.map(r => r.job_id));
    } catch (err) {
      console.error(err);
    }
    console.log('enqueue');
  };
  return (
    <div>
      <PageTitleComponent title={'Queue'} subtitle={'Queue Job Item Records'} />
      <Flex flexDir={'column'} ml={6}>
        <Stack mr={'auto'} direction={'horizontal'}>
          <Button
            colorScheme="blue"
            variant={'outline'}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
          <Button colorScheme="red" variant={'outline'} onClick={handleEnqueue}>
            Enqueue
          </Button>
        </Stack>
        <QueueGrid recordData={records} selectedRecords={setSelectedRecords} />
      </Flex>
    </div>
  );
};
