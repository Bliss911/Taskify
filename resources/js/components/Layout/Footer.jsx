import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "./Header/Logo";
import { useAuth } from "../../contexts/AuthProvider";
import { useLocation } from "react-router-dom";

export default function SmallCentered() {
  const { isAuth, logout } = useAuth();
  const { pathname } = useLocation();
  if (
    pathname == "/" ||
    pathname == "/login" ||
    pathname == "/how_it_works" ||
    pathname == "/enroll" ||
    pathname == "/join" ||
    pathname == "/tasks"
  ) {
    return (
      <Box
        bg={useColorModeValue("primary.500", "gray.900")}
        color={useColorModeValue("gray.200", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Logo />
          <Stack
            spacing={6}
            className="qfont"
            fontWeight="semibold"
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/how_it_works">How It Works</Link>
            {!isAuth && (
              <>
                {" "}
                <Link to="/join">Join</Link>
                <Link to="/enroll">Enroll</Link>
                <Link to="/login">Login</Link>
              </>
            )}
            {isAuth && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Button
                  onClick={() => {
                    logout();
                  }}
                  size="sm"
                  rounded="md"
                  color={["primary.500", "primary.500", "white", "white"]}
                  bg={["white", "white", "primary.500", "primary.500"]}
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
              </>
            )}
          </Stack>
        </Container>

        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "center" }}
            align={{ base: "center", md: "center" }}
          >
            <Text className="qfont">© 2021 Taskify. All rights reserved</Text>
          </Container>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
