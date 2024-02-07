import { Divider, Flex } from '@chakra-ui/react';
import { StatCard } from '../components/cards/StatCard.jsx';
import React from 'react';
import { Boxes, BoxIcon, EyeIcon, HeartCrackIcon, Rocket } from 'lucide-react';
import { PageTitleComponent } from '../components/layout/PageTitleComponent.jsx';

export const Dashboard = () => {
  return (
    <div>
      <PageTitleComponent
        title={'Dashboard'}
        subtitle={'Overview of the Janus System'}
      />
      <Flex
        display={'flex'}
        justifyContent={'space-between'}
        wrap={'wrap'}
        ml={4}
        mr={4}
      >
        <StatCard
          title={'Ready'}
          description={'+10% from yesterday'}
          value={234}
          arrowType={'increase'}
          icon={<BoxIcon color={'grey'} />}
        />
        <StatCard
          title={'Processing'}
          description={'+10% from yesterday'}
          value={10}
          arrowType={'decrease'}
          icon={<Rocket color={'grey'} />}
        />
        <StatCard
          title={'In-Queue'}
          description={'+10% from yesterday'}
          value={900}
          arrowType={'increase'}
          icon={<Boxes color={'grey'} />}
        />{' '}
        <StatCard
          title={'Failed'}
          description={'+2% from yesterday'}
          value={5}
          arrowType={'decrease'}
          icon={<HeartCrackIcon color={'grey'} />}
        />{' '}
        <StatCard
          title={'In-DLQ'}
          description={'+10% from yesterday'}
          value={10}
          arrowType={'increase'}
          icon={<EyeIcon color={'grey'} />}
        />
      </Flex>
      <Divider mt={8} />
    </div>
  );
};
