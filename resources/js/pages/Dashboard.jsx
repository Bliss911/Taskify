import { Box, Text, Flex, Divider, List, ListItem } from "@chakra-ui/layout";
import React, { useState } from "react";
import {
    useBreakpointValue,
    SlideFade,
    IconButton,
    useColorModeValue,
    ListIcon,
    Avatar,
} from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import { MdMenu } from "react-icons/md";
import { useAuth } from "../contexts/AuthProvider";
import { Redirect, Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { user, isAuth } = useAuth();

    return (
        <>
            {!isAuth && <Redirect to="/login" />}
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
                    pb={3}
                    width={useBreakpointValue({
                        base: "60%",
                        md: "32%",
                    })}
                    position={useBreakpointValue({
                        base: "absolute",
                        md: "initial",
                    })}
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
                                <ReactTimeAgo
                                    date={user.joined}
                                    locale="en-US"
                                    timeStyle="twitter"
                                />
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
                                to="/messages"
                                style={{
                                    display: "block",
                                    width: "100%",
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
                                }}
                            >
                                <ListIcon as={GiPayMoney} color="green.500" />
                                Payment History
                            </Link>
                        </ListItem>
                    </List>
                </Box>

                <Box
                    width={useBreakpointValue({ base: "100%", md: "65%" })}
                    height="100%"
                    top="0"
                >
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
                            Dashboard
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
                        <SlideFade dir="left" in></SlideFade>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}
