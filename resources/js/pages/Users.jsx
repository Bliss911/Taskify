import { Flex } from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Text,
  Spinner,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
} from '@chakra-ui/react';

import ErrorBanner from '../components/ErrorBanner';
import { useAuth } from '../contexts/AuthProvider';
import ProfileCard from '../components/Dashboard/ProfileCard';

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setErr] = useState(null);

  const { user } = useAuth();

  const fetchAllUsers = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get('/api/admin/users');
      const { data } = dt.data;
      setUsers(data.pending);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      {user.role === 'ADMIN' && (
        <Box>
          {loading && !error && (
            <Center>
              <Spinner size="lg" colorScheme="green.500" />
            </Center>
          )}
          <SimpleGrid columns={[1, 2]} spacing="3">
            {!loading && !error && (
              <>
                {users.map((s, i) => {
                  return (
                    <SlideFade key={i} dir="left" in>
                      <ProfileCard user={s} />
                    </SlideFade>
                  );
                })}
              </>
            )}
          </SimpleGrid>

          {!loading && error && (
            <>
              <ErrorBanner message={error.message} retry={fetchAllUsers} />
            </>
          )}
          {!loading && !error && users.length == 0 && (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              minHeight="220px"
            >
              <AlertIcon size="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg" className="qfont">
                Oops! Looks empty here!
              </AlertTitle>
              <AlertDescription maxWidth="sm" className="qfont">
                You have no pending signups
              </AlertDescription>
            </Alert>
          )}
        </Box>
      )}
    </>
  );
}
