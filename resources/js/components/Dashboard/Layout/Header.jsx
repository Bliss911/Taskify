import {
  Box,
  Center,
  IconButton,
  Text,
  Flex,
  Button,
  Stack,
  Avatar,
} from "@chakra-ui/react";

import { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";

const Header = ({ showSidebarButton = true, onShowSidebar, onOpen }) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);
  const { logout, user } = useAuth();
  return (
    <Flex
      bg="white"
      shadow="md"
      p={4}
      height="68px"
      justifyContent="center"
      position="sticky"
      top="0"
      zIndex="10"
      className="qfont"
    >
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<FaChevronRight w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
        {user.role !== "ADMIN" && (
          <Button size="md" color="green.500" onClick={onOpen}>
            Wallet
          </Button>
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">
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
            {pathname == "/notifications" && "Notifications"}
            {pathname == "/task_history" && "Task History"}
            {pathname == "/viewtask" && "View Task"}
            {pathname == "/users" && "All Users"}
            {pathname == "/messages" && "Messages"}
            {pathname == "/profile" && "Profile"}
            {pathname == "/complaints" && "Complaints"}
          </Text>
        </Text>
      </Center>

      <Flex
        alignItems={"flex-end"}
        w="fit-content"
        flexDir="column"
        flex="1"
        position="relative"
      >
        <Button
          rounded={"full"}
          cursor={"pointer"}
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {user && user.role + " "} <Avatar ml="2" size={"sm"} src={user.pic} />
        </Button>

        <Stack
          pos="absolute"
          top="100%"
          right="0"
          bg="white"
          py="4"
          width="100px"
          boxShadow="md"
          transition="all .4s ease"
          zIndex="12"
          transform={show ? "translateX(150%)" : "translateX(0)"}
          display={show ? "none" : "block"}
        >
          <Box
            w="full"
            as={Link}
            to="/profile"
            style={{
              display: "block",
              width: "100%",
            }}
            py="2"
            _hover={{ background: "gray.100" }}
            cursor="pointer"
            textAlign="center"
          >
            Profile
          </Box>
          <Box
            w="full"
            onClick={logout}
            py="2"
            _hover={{ background: "gray.100" }}
            cursor="pointer"
            textAlign="center"
          >
            Logout
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Header;
