import { Flex } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import {
  Box,
  useBreakpointValue,
  Text,
  Stack,
  Spinner,
	Tabs,Tab, TabList, TabPanels, TabPanel,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FaCheckDouble, FaDollarSign } from "react-icons/fa";
import TaskLinkBar from "../components/TasksFeed/TaskLinkBar";
import ErrorBanner from "../components/ErrorBanner";
import { useAuth } from "../contexts/AuthProvider";
export default function History() {
  // 1. Create the component
  function DataTabs({ data }) {
    return (
      <Tabs isManual isLazy>
        <TabList className='qfont'>
          {data.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={4} key={index} className='afont'>
              {tab.component&&tab.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
  }

  // 2. Create an array of data
  const tabData = [
    {
      label: "Pending",
			component: <PendingTasks/>
    },
    {
      label: "Completed",
			component: <CompletedTasks/>
    },
    {
      label: "Cancelled",
			component: <CancelledTasks/>
    },
  ]

  // 3. Pass the props and chill!
  return <DataTabs data={tabData} />
}


const PendingTasks = ()=>{
	  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setErr] = useState(null);

  const { user } = useAuth();

  const fetchAllTasks = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/tasks/mypendingtasks");
      const { data } = dt.data;
      setTasks(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);
	return( <Box>
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
      </Box>)
}


const CompletedTasks = ()=>{
	  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setErr] = useState(null);

  const { user } = useAuth();

  const fetchAllTasks = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/tasks/mycompletedtasks");
      const { data } = dt.data;
      setTasks(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);
	return( <Box>
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
      </Box>)
}


const CancelledTasks = ()=>{
	  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setErr] = useState(null);

  const { user } = useAuth();

  const fetchAllTasks = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/tasks/mycancelledtasks");
      const { data } = dt.data;
      setTasks(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);
	return( <Box>
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
      </Box>)
}


























