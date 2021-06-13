import {
  Box,
  Text,
  Flex,
  Divider,
  List,
  ListItem,
  Badge,
  HStack,
} from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import {
  useBreakpointValue,
  Button,
  SlideFade,
  IconButton,
  useColorModeValue,
  ListIcon,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerBody,
  Input,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import { MdAddBox, MdMenu } from "react-icons/md";
import { useAuth } from "../contexts/AuthProvider";
import { Redirect, Link, Route, Switch, useLocation } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { FaHistory, FaHome, FaUser, FaWallet } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import DashboardHome from "../components/Dashboard/DashboardHome";
import AddNewTask from "../components/Dashboard/AddNewTask";
import AuthBanner from "../components/Auth/AuthBanner";
import SingleTask from "./SingleTask";
import Messages from "./Messages";
import { useGenCtx } from "../contexts/GeneralProvider";
import History from "./History";
import Payments from "./Payments";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const { user, isAuth } = useAuth();
  const { pathname } = useLocation();
  const [dashLoading, setDashLoading] = useState(true);
  const [dashError, setDashErr] = useState(null);
  const [dash, setDash] = useState(null);
  const [amount, setAmt] = useState(0);

  // if (!isAuth) return <Redirect to="/login" />;
  const WIDTH = useBreakpointValue({
    base: "60%",
    md: "32%",
  });
  const WIDTH2 = useBreakpointValue({ base: "100%", md: "65%" });
  const POS = useBreakpointValue({
    base: "absolute",
    md: "initial",
  });
  const TRANSFORM = useBreakpointValue({
    base: show ? "translateX(0)" : "translateX(-102%)",
    md: "",
  });
  const BG = useBreakpointValue({
    base: useColorModeValue("white", "#1a202c"),
    md: "initial",
  });
  const PR = useBreakpointValue({
    base: "15px",
    md: "",
  });
  const DISP = useBreakpointValue({
    base: "block",
    md: "none",
  });
  const { recipient } = useGenCtx();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchDashboard = async () => {
    setDashErr(null);
    try {
      const dt = await axios.get("/api/auth/dashboard");
      const { data } = dt.data;
      console.log(data);
      setDash(data);
      setDashLoading(false);
      setAmt(0);
    } catch (error) {
      setDashErr(error.message);
      setDashLoading(false);
    }
  };
  const addMoney = async (id) => {
    setDashLoading(true);
    try {
      const dt = await axios.post("/api/wallet/add", { id, amount: amount });
      const { data } = dt.data;
      console.log(data);
      setDash(data);
      setDashLoading(false);
    } catch (error) {
      setDashErr(error.message);
      setDashLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <Box position="relative">
      {!isAuth && <AuthBanner />}
      <Flex
        display={isAuth ? "flex" : "none"}
        id="feed-container"
        minHeight={"80vh"}
        height="100%"
        position="relative"
        pt={4}
        mb={4}
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        justifyContent="space-between"
        overflowY="scroll"
      >
        <Box
          pb={3}
          width={WIDTH}
          position={POS}
          transform={TRANSFORM}
          transition="all 0.4s ease"
          top="0"
          height="100%"
          bg={BG}
          pr={PR}
          boxShadow="md"
          zIndex="9"
        >
          <Box p={3} position="relative">
            <Badge position="absolute" top="0" right="0" colorScheme="green">
              {user.role}
            </Badge>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Avatar name={user.name} />
              <Text fontWeight="bold" py={4} className="qfont" as="h3">
                {user.name}
              </Text>
              <Text style={{ marginTop: 0 }} className="qfont" as="small">
                Joined since{" "}
                {isAuth && user.joined && (
                  <ReactTimeAgo
                    date={isAuth ? user.joined : "2020"}
                    locale="en-US"
                    timeStyle="twitter"
                  />
                )}
              </Text>
            </Flex>
          </Box>

          <Divider width={"100%"} margin="auto" height="5px" />
          <List spacing={3}>
            <ListItem
              className="qfont"
              _hover={{
                backgroundColor: "#0ca25f",
                color: "white",
              }}
              transition="all 0.3s ease"
              cursor="pointer"
              textAlign="center"
            >
              <Link
                onClick={() => {
                  setShow(false);
                }}
                to="/dashboard"
                style={{
                  display: "block",
                  padding: "8px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ListIcon as={FaHome} color="green.500" />
                Overview
              </Link>
            </ListItem>
            <ListItem
              className="qfont"
              _hover={{
                backgroundColor: "#0ca25f",
                color: "white",
              }}
              transition="all 0.3s ease"
              cursor="pointer"
              textAlign="center"
            >
              <Link
                onClick={() => {
                  setShow(false);
                }}
                to="/messages"
                style={{
                  display: "block",
                  padding: "8px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ListIcon as={TiMessages} color="green.500" />
                Messages
              </Link>
            </ListItem>
            <ListItem
              className="qfont"
              _hover={{
                backgroundColor: "#0ca25f",
                color: "white",
              }}
              transition="all 0.3s ease"
              cursor="pointer"
              textAlign="center"
            >
              <Link
                onClick={() => {
                  setShow(false);
                }}
                to="/task_history"
                style={{
                  display: "block",
                  padding: "8px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ListIcon as={FaHistory} color="green.500" />
                Task History
              </Link>
            </ListItem>
            <ListItem
              className="qfont"
              _hover={{
                backgroundColor: "#0ca25f",
                color: "white",
              }}
              transition="all 0.3s ease"
              cursor="pointer"
              textAlign="center"
            >
              <Link
                onClick={() => {
                  setShow(false);
                }}
                to="/payment_history"
                style={{
                  display: "block",
                  padding: "8px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ListIcon as={GiPayMoney} color="green.500" />
                Payment History
              </Link>
            </ListItem>
          </List>
        </Box>

        <Box width={WIDTH2} height="100%" top="0">
          <Flex p={3} alignItems="center" justifyContent="space-between">
            <Text
              id="top"
              color="#0ca25f"
              as="h1"
              fontSize="22px"
              fontWeight="bold"
              className="qfont"
            >
              {pathname == "/add_task" && "Add New Task"}
              {pathname == "/dashboard" && "Dashboard"}
              {pathname == "/payment_history" && "Payment History"}
              {pathname == "/task_history" && "Task History"}
              {pathname == "/viewtask" && "View Task"}
              {pathname == "/messages" && recipient == null && "Messages"}
              {pathname == "/messages" &&
                recipient != null &&
                user.id == recipient.id &&
                sender.firstname}
              {pathname == "/messages" &&
                recipient != null &&
                user.id != recipient.id &&
                recipient.firstname}
            </Text>
            <HStack>
              <Button
                leftIcon={<FaWallet />}
                className="qfont"
                colorScheme="green"
                variant="outline"
                onClick={onOpen}
                as="span"
                color="#0ca25f"
              >
                Wallet
              </Button>

              {user.role == "CLIENT" && (
                <Link to="/add_task">
                  <Button size="md" className="qfont" color="green.500">
                    <MdAddBox />
                    New Task
                  </Button>
                </Link>
              )}
              <Box
                display={
                  pathname == "/messages"
                    ? ["block", "block", "none", "none"]
                    : "none"
                }
                onClick={() => {
                  setShowUsers((prev) => !prev);
                }}
                as="span"
                color="#0ca25f"
              >
                <IconButton>
                  <FaUser />
                </IconButton>
              </Box>
              <Box
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                as="span"
                display={DISP}
                color="#0ca25f"
              >
                <IconButton>
                  <MdMenu />
                </IconButton>
              </Box>
            </HStack>
          </Flex>
          <Divider width={"100%"} margin="auto" height="5px" />
          <Box position="relative">
            <SlideFade dir="left" in>
              <Switch>
                <Route exact path="/dashboard">
                  <DashboardHome
                    setDash={setDash}
                    setDashLoading={setDashLoading}
                    dashLoading={dashLoading}
                    setDashErr={setDashErr}
                    dashError={dashError}
                    dash={dash}
                  />
                </Route>
                <Route exact path="/add_task">
                  <AddNewTask />
                </Route>
                <Route exact path="/viewtask">
                  <SingleTask />
                </Route>
                <Route exact path="/messages">
                  <Messages showUsers={showUsers} setShowUsers={setShowUsers} />
                </Route>
                <Route exact path="/payment_history">
                  <Payments />
                </Route>
                <Route exact path="/task_history">
                  <History />
                </Route>
              </Switch>
            </SlideFade>
          </Box>
        </Box>
      </Flex>
      <Drawer placement="left" size="sm" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" className="qfont">
            Wallet : ${dash && dash.wallet.amount}
          </DrawerHeader>
          <DrawerBody className="qfont">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addMoney(dash && dash.wallet.id);
              }}
            >
              Fund Your Wallet
              <Input
                required
                min={1}
                type="number"
                placeholder="Type here..."
                value={amount}
                onChange={(e) => {
                  setAmt(e.target.value);
                }}
              />
              <Button
                type="submit"
                isLoading={dashLoading}
                loadingText="Submitting"
                colorScheme="green"
                variant="outline"
              >
                Submit
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
