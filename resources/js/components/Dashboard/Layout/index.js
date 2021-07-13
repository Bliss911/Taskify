import { useState } from "react";
import { Box, Container, useBreakpointValue } from "@chakra-ui/react";

import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "../../../contexts/AuthProvider.js";
import AuthBanner from "../../Auth/AuthBanner";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function Layout({ children, onOpen }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const { isAuth } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      {isAuth && (
        <>
          <Sidebar
            variant={variants?.navigation}
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
          />
          <Box ml={!variants?.navigationButton && "250px"}>
            <Header
              onOpen={onOpen}
              showSidebarButton={variants?.navigationButton}
              onShowSidebar={toggleSidebar}
            />
            <Box pos="relative">{children}</Box>
          </Box>
        </>
      )}

      {!isAuth && <AuthBanner />}
    </>
  );
}
