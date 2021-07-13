import {
  Container,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerHeader,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import DashoardHome from "../components/Dashboard/DashboardHome";
import Layout from "../components/Dashboard/Layout";
import { useAuth } from "../contexts/AuthProvider";
import PrivateRoute from "../helpers/PrivateRoute";
import Messages from "./Messages";
import Notifications from "./Notifications";
import History from "./History";
import Users from "./Users";
import Payments from "./Payments";
import SingleTask from "./SingleTask";
import AddNewTask from "../components/Dashboard/AddNewTask";
import { Switch } from "react-router-dom";
import Profile from "./Profile";

function Dashboard() {
  const { user, isAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [dashLoading, setDashLoading] = useState(true);
  const [dashError, setDashErr] = useState(null);
  const [dash, setDash] = useState(null);
  const [amount, setAmt] = useState(0);
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
      onClose();
    } catch (error) {
      setDashErr(error.message);
      setDashLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchDashboard();
  // }, []);

  return (
    <Layout onOpen={onOpen}>
      <Switch>
        <PrivateRoute exact path="/dashboard">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <DashoardHome
                setDash={setDash}
                setDashLoading={setDashLoading}
                dashLoading={dashLoading}
                setDashErr={setDashErr}
                dashError={dashError}
                dash={dash}
                fetchDash={fetchDashboard}
              />
            </Box>
          </Container>
        </PrivateRoute>
        <PrivateRoute exact path="/add_task">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <AddNewTask />
            </Box>
          </Container>
        </PrivateRoute>

        <PrivateRoute exact path="/viewtask">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <SingleTask />
            </Box>
          </Container>
        </PrivateRoute>

        <PrivateRoute exact path="/messages">
          <Box pos="relative">
            <Messages />
          </Box>
        </PrivateRoute>
        <PrivateRoute exact path="/notifications">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <Notifications />
            </Box>
          </Container>
        </PrivateRoute>

        <PrivateRoute exact path="/task_history">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <History />
            </Box>
          </Container>
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <Profile />
            </Box>
          </Container>
        </PrivateRoute>

        <PrivateRoute exact path="/payment_history">
          <Container maxW="container.xl" pt="8">
            <Box px="4">
              <Payments />
            </Box>
          </Container>
        </PrivateRoute>

        {user.role === "ADMIN" && (
          <PrivateRoute exact path="/users">
            <Container maxW="container.xl" pt="8">
              <Box px="4">
                <Users />
              </Box>
            </Container>
          </PrivateRoute>
        )}
      </Switch>
      {user.role !== "ADMIN" && (
        <>
          <Drawer placement="left" size="sm" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px" className="qfont">
                Wallet : ${dash && dash.wallet && dash.wallet.amount}
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
        </>
      )}
    </Layout>
  );
}

export default Dashboard;
