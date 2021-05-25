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
import React, { useState } from "react";
import {
    useBreakpointValue,
    Button,
    SlideFade,
    IconButton,
    useColorModeValue,
    ListIcon,
    Avatar,
    useDisclosure,
} from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import { MdAddBox, MdMenu } from "react-icons/md";
import { useAuth } from "../contexts/AuthProvider";
import { Redirect, Link, Route, Switch, useLocation } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { FaHistory, FaHome } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import DashboardHome from "../components/Dashboard/DashboardHome";
import AddNewTask from "../components/Dashboard/AddNewTask";
import AuthBanner from "../components/Auth/AuthBanner";
import SingleTask from "./SingleTask";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { user, isAuth } = useAuth();
    const { pathname } = useLocation();

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
    return (
        <>
            {!isAuth && <AuthBanner />}
            <Flex
                display={isAuth ? "flex" : "none"}
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
                        <Badge
                            position="absolute"
                            top="0"
                            right="0"
                            colorScheme="green"
                        >
                            {user.role}
                        </Badge>
                        <Flex
                            flexDir="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Avatar name={user.name} />
                            <Text
                                fontWeight="bold"
                                py={4}
                                className="qfont"
                                as="h3"
                            >
                                {user.name}
                            </Text>
                            <Text
                                style={{ marginTop: 0 }}
                                className="qfont"
                                as="small"
                            >
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
                            p={2}
                            _hover={{
                                backgroundColor: "#0ca25f",
                                color: "white",
                            }}
                            transition="all 0.3s ease"
                            cursor="pointer"
                            textAlign="center"
                        >
                            <Link
                                to="/dashboard"
                                style={{
                                    display: "block",
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
                            p={2}
                            _hover={{
                                backgroundColor: "#0ca25f",
                                color: "white",
                            }}
                            transition="all 0.3s ease"
                            cursor="pointer"
                            textAlign="center"
                        >
                            <Link
                                to="/messages"
                                style={{
                                    display: "block",
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
                            p={2}
                            _hover={{
                                backgroundColor: "#0ca25f",
                                color: "white",
                            }}
                            transition="all 0.3s ease"
                            cursor="pointer"
                            textAlign="center"
                        >
                            <Link
                                to="/task_history"
                                style={{
                                    display: "block",
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
                            p={2}
                            _hover={{
                                backgroundColor: "#0ca25f",
                                color: "white",
                            }}
                            transition="all 0.3s ease"
                            cursor="pointer"
                            textAlign="center"
                        >
                            <Link
                                to="/payment_history"
                                style={{
                                    display: "block",
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
                    <Flex
                        p={3}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            id="top"
                            color="#0ca25f"
                            as="h1"
                            fontSize="22px"
                            fontWeight="bold"
                            className="qfont"
                        >
                            {pathname == "/messages" && "Messages"}
                            {pathname == "/add_task" && "Add New Task"}
                            {pathname == "/dashboard" && "Dashboard"}
                            {pathname == "/payment_history" &&
                                "Payment History"}
                            {pathname == "/task_history" && "Task History"}
                            {pathname == "/viewtask" && "View Task"}
                        </Text>
                        <HStack>
                            {user.role == "CLIENT" && (
                                <Link to="/add_task">
                                    <Button
                                        size="md"
                                        className="qfont"
                                        color="green.500"
                                    >
                                        <MdAddBox />
                                        New Task
                                    </Button>
                                </Link>
                            )}
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
                    <Box>
                        <SlideFade dir="left" in>
                            <Switch>
                                <Route exact path="/dashboard">
                                    <DashboardHome />
                                </Route>
                                <Route exact path="/add_task">
                                    <AddNewTask />
                                </Route>
                                <Route exact path="/viewtask">
                                    <SingleTask />
                                </Route>
                                <Route exact path="/messages"></Route>
                                <Route exact path="/payment_history"></Route>
                                <Route exact path="/task_history"></Route>
                            </Switch>
                        </SlideFade>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}
