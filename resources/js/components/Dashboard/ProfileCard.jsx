import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import cogoToast from 'cogo-toast';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';

export default function ProfileCard(props) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(props.user);
  const [err, setErr] = useState(false);

  async function verifyUser() {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.post('/api/admin/verify', { user: user.id });
      const { data } = dt.data;
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
      cogoToast.error('An error occurred! Try again');
    }
  }

  return (
    <Center py={6}>
      <Box
        border={err ? '1px solid red' : ''}
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          name={user.firstname + ' ' + user.lastname}
          src={null}
          alt={user.firstname + ' ' + user.lastname}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'1xl'} className="qfont">
          {user.firstname + ' ' + user.lastname}
        </Heading>
        <Text fontWeight={600} color={'gray.500'}>
          <ReactTimeAgo date={user.created_at} />
        </Text>
        <Text
          textAlign={'center'}
          as="small"
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
          className="afont"
        >
          {user.email}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>
          {user.skills &&
            user.skills.map((s, i) => {
              return (
                <Badge
                  key={i}
                  px={2}
                  colorScheme="green"
                  py={1}
                  fontWeight={'400'}
                >
                  {s.name}
                </Badge>
              );
            })}
        </Stack>

        {user.role === 'VENDOR' && (
          <Stack mt={4} direction={'row'} spacing={4} alignItems="center">
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              disabled={user.status === 'VERIFIED'}
              bg={'green.500'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'green.500',
              }}
              isLoading={loading}
              loadingText="verifying..."
              onClick={verifyUser}
            >
              {user.status === 'VERIFIED' ? 'VERIFIED' : 'Verify'}
            </Button>
          </Stack>
        )}
        {user.role === 'CLIENT' && (
          <Stack mt={5} direction={'row'} spacing={4} alignItems="center">
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              disabled={user.status === 'VERIFIED'}
              bg={'green.500'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'green.500',
              }}
            >
              CLIENT
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
}
