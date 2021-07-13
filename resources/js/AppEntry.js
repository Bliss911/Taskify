import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Route, Switch } from "react-router-dom";
import theme from "./helpers/theme.js";
import { useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import Loader from "./components/Loader.js";
import Footer from "./components/Layout/Footer";
import Dashboard from "./pages/Dashboard";

import NotFound from "./components/Auth/NotFound";
import Main from "./pages/Main.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2100);
  });
  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher /> */}
      {loading && <Loader />}
      {!loading && (
        <>
          <Switch>
            <Route
              exact
              path={[
                "/",
                "/how_it_works",
                "/join",
                "/enroll",
                "/tasks",
                "/login",
              ]}
            >
              <Main />
            </Route>
            <Route
              exact
              path={[
                "/dashboard",
                "/add_task",
                "/viewtask",
                "/messages",
                "/notifications",
                "/task_history",
                "/payment_history",
                "/profile",
              ]}
            >
              <Dashboard />
            </Route>
            {user.role === "ADMIN" && (
              <Route exact path="/users">
                <Dashboard />
              </Route>
            )}

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </>
      )}

      <Footer />
    </ChakraProvider>
  );
}

export default App;
