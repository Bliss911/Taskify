import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  VStack,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Logo from "../../Layout/Header/Logo";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaUserAlt,
  FaHistory,
  FaRegListAlt,
  FaDollarSign,
} from "react-icons/fa";
import { RiFolderHistoryFill } from "react-icons/ri";
import { useAuth } from "../../../contexts/AuthProvider";
const linksForClient = [
  {
    path: "/dashboard",
    link: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/add_task",
    link: "New Task",
    icon: <FaRegListAlt />,
  },
  {
    path: "/messages",
    link: "Messages",
    icon: <FaEnvelope />,
  },
  {
    path: "/notifications",
    link: "Notification",
    icon: <FaBell />,
  },
  {
    path: "/task_history",
    link: "Task History",
    icon: <RiFolderHistoryFill />,
  },
  {
    path: "/payment_history",
    link: "Payment History",
    icon: <FaHistory />,
  },
  {
    path: "/tasks",
    link: "Available Tasks",
    icon: <FaHistory />,
  },
];
const linksForVendor = [
  {
    path: "/dashboard",
    link: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/messages",
    link: "Messages",
    icon: <FaEnvelope />,
  },
  {
    path: "/notifications",
    link: "Notification",
    icon: <FaBell />,
  },
  {
    path: "/task_history",
    link: "Task History",
    icon: <RiFolderHistoryFill />,
  },
  {
    path: "/payment_history",
    link: "Payment History",
    icon: <FaHistory />,
  },
  {
    path: "/tasks",
    link: "Available Tasks",
    icon: <FaHistory />,
  },
];
const linksForAdmin = [
  {
    path: "/dashboard",
    link: "Overview",
    icon: <FaHome />,
  },
  {
    path: "/users",
    link: "Users",
    icon: <FaUserAlt />,
  },

  {
    path: "/tasks",
    link: "Available Tasks",
    icon: <FaHistory />,
  },
];

const SidebarContent = ({ onClick }) => {
  const { user } = useAuth();
  return (
    <Box>
      <Flex
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray.100"
        width="100%"
        height="70px"
        pl="30px"
        className="qfont"
      >
        <Logo />
      </Flex>
      <VStack width="100%" spacing="0">
        {user.role == "CLIENT" &&
          linksForClient.map((link, i) => {
            return (
              <Button
                key={i}
                display="block"
                size="lg"
                variant="flushed"
                _hover={{
                  bg: "gray.100",
                }}
                onClick={onClick}
                w="100%"
                rounded="0"
                fontWeight="light"
                h="60px"
                fontSize="16px"
                px="0"
              >
                <NavLink
                  exact
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: "0 30px",
                  }}
                  activeStyle={{
                    background: "#f5f5f7",
                    color: "green",
                  }}
                  to={link.path}
                >
                  <HStack as="span" spacing="10px">
                    {link.icon}
                    <Text className="qfont">{link.link}</Text>
                  </HStack>
                </NavLink>
              </Button>
            );
          })}
        {user.role == "VENDOR" &&
          linksForVendor.map((link, i) => {
            return (
              <Button
                key={i}
                display="block"
                size="lg"
                variant="flushed"
                _hover={{
                  bg: "gray.100",
                }}
                onClick={onClick}
                w="100%"
                rounded="0"
                fontWeight="light"
                h="60px"
                fontSize="16px"
                px="0"
              >
                <NavLink
                  exact
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: "0 30px",
                  }}
                  activeStyle={{
                    background: "#f5f5f7",
                    color: "green",
                  }}
                  to={link.path}
                >
                  <HStack as="span" spacing="10px">
                    {link.icon}
                    <Text className="qfont">{link.link}</Text>
                  </HStack>
                </NavLink>
              </Button>
            );
          })}
        {user.role == "ADMIN" &&
          linksForAdmin.map((link, i) => {
            return (
              <Button
                key={i}
                display="block"
                size="lg"
                variant="flushed"
                _hover={{
                  bg: "gray.100",
                }}
                onClick={onClick}
                w="100%"
                rounded="0"
                fontWeight="light"
                h="60px"
                fontSize="16px"
                px="0"
              >
                <NavLink
                  exact
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: "0 30px",
                  }}
                  activeStyle={{
                    background: "#f5f5f7",
                    color: "green",
                  }}
                  to={link.path}
                >
                  <HStack as="span" spacing="10px">
                    {link.icon}
                    <Text className="qfont">{link.link}</Text>
                  </HStack>
                </NavLink>
              </Button>
            );
          })}
      </VStack>
    </Box>
  );
};

const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      w="250px"
      top={0}
      h="100%"
      bg="white"
      shadow="lg"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody px="0">
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
