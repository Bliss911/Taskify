import React from "react";
import { Box } from "@chakra-ui/react";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import SignUp from "./SignUp";
import Enroll from "./Enroll";
import Feed from "./Feed";
import Login from "./Login";
import { Route } from "react-router-dom";
import Navbar from "../components/Layout/Header/Navbar";

function Main({ children }) {
  return (
    <Box id="content" margin="auto" maxWidth="1348px">
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/tasks">
        <Feed />
      </Route>
      <Route exact path="/how_it_works">
        <HowItWorks />
      </Route>
      <Route exact path="/join">
        <SignUp />
      </Route>
      <Route exact path="/enroll">
        <Enroll />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Box>
  );
}

export default Main;
