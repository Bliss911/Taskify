import { Box, Text, Flex, Divider } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import {
  useBreakpointValue,
  SlideFade,
  IconButton,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import TaskLinkBar from "../components/TasksFeed/TaskLinkBar";
import SkillsSelect from "../components/TasksFeed/SkillsSelect";
import { MdMenu } from "react-icons/md";
import axios from "axios";
import ErrorBanner from "../components/ErrorBanner";
export default function Feed() {
  const [currentTab, setCurrentTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [skills, setSkills] = useState([]);
  const [error, setErr] = useState(null);

  const searchCategories = (v) => {
    setCurrentTab(v.name);
    fetchAllTasks(v.id);
  };
  const fetchAllTasks = async (id = null) => {
    setLoading(true);
    setErr(null);
    const link = "/api/tasks";
    if (!id) {
      try {
        const dt = await axios.post(link);
        const { data } = dt.data;
        setSkills(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setErr(error.message);
        setLoading(false);
      }
    } else {
      try {
        const dt = await axios.post(link, { id });
        const { data } = dt.data;
        setSkills(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setErr(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);
  return (
    <>
      <Flex
        id="feed-container"
        minHeight={"80vh"}
        height="fit-content"
        position="relative"
        pt={4}
        mb={4}
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        justifyContent="space-between"
        overflowY="scroll"
      >
        <Box
          width={useBreakpointValue({
            base: "60%",
            md: "32%",
          })}
          position={useBreakpointValue({
            base: "absolute",
            md: "initial",
          })}
          zIndex="999"
          transform={useBreakpointValue({
            base: show ? "translateX(0)" : "translateX(-102%)",
            md: "",
          })}
          transition="all 0.4s ease"
          top="0"
          height="100%"
          bg={useBreakpointValue({
            base: useColorModeValue("white", "#1a202c"),
            md: "initial",
          })}
          pr={useBreakpointValue({
            base: "15px",
            md: "",
          })}
          boxShadow="md"
        >
          <Box p={3}>
            <Text
              id="top"
              color="#0ca25f"
              as="h1"
              fontSize="22px"
              fontWeight="bold"
              className="qfont"
            >
              Select Category
            </Text>
          </Box>

          <Divider width={"100%"} margin="auto" height="5px" />
          <SkillsSelect searchCategories={searchCategories} setShow={setShow} />
        </Box>

        <Box
          width={useBreakpointValue({ base: "100%", md: "65%" })}
          height="100%"
          top="0"
        >
          <Flex p={3} alignItems="center" justifyContent="space-between">
            <Text
              id="top"
              color="#0ca25f"
              as="h1"
              fontSize="22px"
              fontWeight="bold"
              className="qfont"
            >
              {currentTab + " "} Tasks
            </Text>
            <Box
              onClick={() => {
                setShow((prev) => !prev);
              }}
              as="span"
              display={useBreakpointValue({
                base: "block",
                md: "none",
              })}
              color="#0ca25f"
            >
              <IconButton>
                <MdMenu />
              </IconButton>
            </Box>
          </Flex>
          <Divider width={"100%"} margin="auto" height="5px" />
          <Box>
            {loading && !error && <Spinner size="lg" colorScheme="green.500" />}
            {!loading && !error && (
              <>
                {skills.map((s, i) => {
                  return (
                    <SlideFade dir="left" key={i} in>
                      <TaskLinkBar s={s} />
                    </SlideFade>
                  );
                })}
              </>
            )}
            {!loading && !error && skills.length == 0 && (
              <>
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
              </>
            )}
            {!loading && error && (
              <>
                <ErrorBanner message={error.message} retry={fetchAllTasks} />
              </>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
