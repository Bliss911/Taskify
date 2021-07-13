import { Flex } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import {
  Box,
  useBreakpointValue,
  Text,
  Stack,
  Spinner,
  Center,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FaCheckDouble,
  FaDollarSign,
  FaLayerGroup,
  FaUserAlt,
} from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { GrInProgress } from "react-icons/gr";
import TaskLinkBar from "../TasksFeed/TaskLinkBar";
import ErrorBanner from "../ErrorBanner";
import { useAuth } from "../../contexts/AuthProvider";
import ProfileCard from "./ProfileCard";

export default function DashoardHome({
  setDash,
  setDashLoading,
  dashLoading,
  setDashErr,
  dashError,
  dash,
  fetchDash,
}) {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setErr] = useState(null);

  const { user } = useAuth();

  const fetchAllTasks = async () => {
    if (user.role === "ADMIN") return fetchAllPending();
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/tasks/mytasks");
      const { data } = dt.data;
      setTasks(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };
  const fetchAllPending = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/admin/pending");
      const { data } = dt.data;
      setUsers(data.pending);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    fetchDash();
  }, []);
  return (
    <>
      <Box>
        <Text fontWeight="light" fontSize="23px" className="qfont">
          {new Date().getHours() < 12 && "Good Morning " + user.firstname + "!"}
          {new Date().getHours() >= 12 &&
            "Good Afternoon " + user.firstname + "!"}
          {new Date().getHours() >= 17 &&
            "Good Evening " + user.firstname + "!"}
        </Text>
        <SimpleGrid columns={[1, 2, 2, 4]} pt={2} spacing="5" flexWrap="wrap">
          <Center rounded="lg" p="4" flexDir="column" bg="white" shadow="md">
            <Box
              as="span"
              bg="gray.200"
              fontSize="20px"
              p={4}
              rounded="md"
              color="green.500"
              m="auto"
              mb="2"
            >
              <FaCheckDouble />
            </Box>
            <Text as="h4" textAlign="center" className="qfont">
              {user.role == "CLIENT"
                ? "Tasks Completed"
                : user.role == "ADMIN"
                ? "Tasks Completed"
                : "Accepted Bids"}
            </Text>
            <Text fontWeight="bold" as="h1" className="qfont">
              {dashLoading && (
                <Box as="small" color="green.500">
                  loading...
                </Box>
              )}
              {!dashLoading && user.role == "CLIENT" && (
                <>{dash && dash.accepted_tasks}</>
              )}
              {!dashLoading && user.role == "VENDOR" && (
                <>{dash && dash.accepted_bids}</>
              )}
              {!dashLoading && user.role == "ADMIN" && (
                <>{dash && dash.accepted_tasks}</>
              )}
            </Text>
          </Center>
          {/* end of first box */}

          <Center rounded="lg" p="4" flexDir="column" bg="white" shadow="md">
            <Box
              as="span"
              bg="gray.200"
              fontSize="20px"
              p={4}
              color="green.500"
              mb="2"
            >
              <GrInProgress />
            </Box>
            <Text as="h4" width="126px" textAlign="center" className="qfont">
              {user.role == "CLIENT"
                ? "Tasks Pending"
                : user.role == "ADMIN"
                ? "Tasks Pending"
                : "Pending Bids"}
            </Text>
            <Text fontWeight="bold" as="h1" className="qfont">
              {dashLoading && (
                <Box as="small" color="green.500">
                  loading...
                </Box>
              )}
              {!dashLoading && user.role == "CLIENT" && (
                <>{dash && dash.pending_tasks}</>
              )}
              {!dashLoading && user.role == "ADMIN" && (
                <>{dash && dash.pending_tasks}</>
              )}
              {!dashLoading && user.role == "VENDOR" && (
                <>{dash && dash.pending_bids}</>
              )}
            </Text>
          </Center>
          {/* end of second box */}
          <Center rounded="lg" p="4" flexDir="column" bg="white" shadow="md">
            <Box
              as="span"
              bg="gray.200"
              fontSize="20px"
              p={4}
              rounded="md"
              color="green.500"
              mb="2"
            >
              {user.role !== "ADMIN" ? <FcCancel /> : <FaLayerGroup />}
            </Box>
            <Text as="h4" width="126px" textAlign="center" className="qfont">
              {user.role == "CLIENT"
                ? "Tasks Cancelled"
                : user.role == "ADMIN"
                ? "All Tasks"
                : "Rejected Bids"}
            </Text>
            <Text fontWeight="bold" as="h1" className="qfont">
              {dashLoading && (
                <Box as="small" color="green.500">
                  loading...
                </Box>
              )}

              {!dashLoading && user.role == "CLIENT" && (
                <>{dash && dash.cancelled_tasks}</>
              )}
              {/* cancelled is DONE for admin */}
              {!dashLoading && user.role == "ADMIN" && (
                <>{dash && dash.cancelled_tasks}</>
              )}
              {!dashLoading && user.role == "VENDOR" && (
                <>{dash && dash.cancelled_bids}</>
              )}
            </Text>
          </Center>

          <Center rounded="lg" p="4" flexDir="column" bg="white" shadow="md">
            <Box
              as="span"
              bg="gray.200"
              fontSize="20px"
              p={4}
              rounded="md"
              color="green.500"
              mb="2"
            >
              {user.role !== "ADMIN" ? <FaDollarSign /> : <FaUserAlt />}
            </Box>
            <Text as="h4" textAlign="center" className="qfont">
              {user.role === "ADMIN" ? "Users" : "Wallet Balance"}
            </Text>
            <Text fontWeight="bold" as="h1" className="qfont">
              {user.role === "ADMIN"
                ? dash && dash.wallet
                : `$ ${dash && dash.wallet.amount}`}
            </Text>
          </Center>
        </SimpleGrid>
      </Box>
      {/*
     {                _         __   _
     {  ___  _ _   __| |  ___  / _| | |__  ___ __ __ ___ __ __
     { / -_)| ' \ / _` | / _ \|  _| | '_ \/ _ \\ \ // -_)\ \ /
     { \___||_||_|\__,_| \___/|_|   |_.__/\___//_\_\\___|/_\_\

     {*/}
      {user.role !== "ADMIN" && (
        <Box>
          <Flex p={3} alignItems="center" justifyContent="space-between">
            <Text
              id="top"
              color="#0ca25f"
              as="h1"
              fontSize="22px"
              fontWeight="bold"
              className="qfont"
            >
              {user && user.role === "CLIENT"
                ? "Recent Tasks"
                : "Accepted Bids"}
            </Text>
          </Flex>
          <Stack spacing={"4"}>
            {loading && !error && <Spinner size="lg" colorScheme="green.500" />}
            {!loading && !error && (
              <>
                {tasks.map((s, i) => {
                  return (
                    <SlideFade key={i} dir="left" in>
                      <TaskLinkBar s={s} />
                    </SlideFade>
                  );
                })}
              </>
            )}
            {!loading && error && (
              <>
                <ErrorBanner message={error.message} retry={fetchAllTasks} />
              </>
            )}
            {tasks.length == 0 && (
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
                  You have no tasks at the moment
                </AlertDescription>
              </Alert>
            )}
          </Stack>
        </Box>
      )}

      {user.role === "ADMIN" && (
        <Box>
          <Flex p={3} alignItems="center" justifyContent="space-between">
            <Text
              id="top"
              color="#0ca25f"
              as="h1"
              fontSize="22px"
              fontWeight="bold"
              className="qfont"
            >
              Recent Vendor Signups
            </Text>
          </Flex>
          {loading && !error && <Spinner size="lg" colorScheme="green.500" />}
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
              <ErrorBanner message={error.message} retry={fetchAllPending} />
            </>
          )}
          {users.length == 0 && (
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
