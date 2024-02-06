import {
  Box,
  Container,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

export const StatCard = ({ title, arrowType, value, icon }) => {
  return (
    <Container
      borderWidth={'1px'}
      borderRadius={'lg'}
      borderColor={'black'}
      maxW={280}
      display={'flex'}
      flexDirection={'column'}
      m={2}
    >
      <Container display={'flex'} pt={4} pb={4}>
        <Box mr={'auto'}>
          <Stat>
            <StatLabel>{title}</StatLabel>
            <StatNumber color={'lightcoral'}>{value}</StatNumber>
            <StatHelpText>
              <StatArrow type={arrowType} />
              23.36% - since yesterday
            </StatHelpText>
          </Stat>
        </Box>
        {icon}
      </Container>
    </Container>
  );
};
