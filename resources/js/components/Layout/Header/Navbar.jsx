import React from "react";

import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import { useAuth } from "../../../contexts/AuthProvider";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Logo
                w="100px"
                color={["white", "white", "primary.500", "primary.500"]}
            />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <Link href={to}>
            <Text
                className="qfont"
                fontWeight="semibold"
                display="block"
                {...rest}
            >
                {children}
            </Text>
        </Link>
    );
};

const MenuLinks = ({ isOpen }) => {
    const { isAuth, logout } = useAuth();
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={4}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem>
                    <Link to="/">Home</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/tasks">Tasks</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/how_it_works">How It works</Link>
                </MenuItem>
                {!isAuth && (
                    <>
                        {" "}
                        <MenuItem>
                            <Link to="/join">Got a Task?</Link>{" "}
                        </MenuItem>
                        <MenuItem>
                            <Link to="/enroll">Enroll&Earn</Link>{" "}
                        </MenuItem>
                        <MenuItem isLast>
                            <Link to="/login">
                                <Button
                                    size="sm"
                                    rounded="md"
                                    color={[
                                        "primary.500",
                                        "primary.500",
                                        "white",
                                        "white",
                                    ]}
                                    bg={[
                                        "white",
                                        "white",
                                        "primary.500",
                                        "primary.500",
                                    ]}
                                    _hover={{
                                        bg: [
                                            "primary.100",
                                            "primary.100",
                                            "primary.600",
                                            "primary.600",
                                        ],
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        </MenuItem>
                    </>
                )}
                {isAuth && (
                    <>
                        <MenuItem>
                            <Link to="/dashboard">Dashboard</Link>
                        </MenuItem>
                        <MenuItem isLast>
                            <Button
                                onClick={() => {
                                    logout();
                                }}
                                size="sm"
                                rounded="md"
                                color={[
                                    "primary.500",
                                    "primary.500",
                                    "white",
                                    "white",
                                ]}
                                bg={[
                                    "white",
                                    "white",
                                    "primary.500",
                                    "primary.500",
                                ]}
                                _hover={{
                                    bg: [
                                        "primary.100",
                                        "primary.100",
                                        "primary.600",
                                        "primary.600",
                                    ],
                                }}
                            >
                                Logout
                            </Button>
                        </MenuItem>
                    </>
                )}
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            position="sticky"
            top="0"
            maxWidth="1348px"
            margin="auto"
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            px={8}
            py={4}
            zIndex={10}
            boxShadow="md"
            bg={[
                "primary.500",
                "primary.500",
                useColorModeValue("white", "gray.700"),
                useColorModeValue("white", "gray.700"),
            ]}
            color={["white", "white", "primary.700", "primary.700"]}
            {...props}
        >
            {children}
        </Flex>
    );
};

export default NavBar;
