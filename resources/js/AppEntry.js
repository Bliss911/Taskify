import { useEffect, useState } from 'react';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/Auth/NotFound';
import Navbar from './components/Layout/Header/Navbar';
import PageLoader from './components/Layout/PageLoader';
import Footer from './components/Layout/Footer'

import Home from './pages/Home';
import theme from "./helpers/theme.js"
import HowItWorks from './pages/HowItWorks';
import Enroll from './pages/Enroll'
import Login from './pages/Login';
import Signup from './pages/SignUp';
import PrivateRoute from './helpers/PrivateRoute';
import Feed from './pages/Feed';
import Dashboard from './pages/Dashboard';


function App () {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2100)
    })
    return (
        <ChakraProvider theme={theme}>
            {/* <ColorModeSwitcher /> */}
            {loading && <PageLoader />}
            <Navbar />
            {!loading && <>
                <Switch>
                    <Box id='content'
                        margin="auto"
                        maxWidth="1348px"
                        px={8}

                    >
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/how_it_works">
                                <HowItWorks />
                            </Route>
                            <Route exact path="/join">
                                <Signup />
                            </Route>
                            <Route exact path="/enroll">
                                <Enroll />
                            </Route>
                            <Route exact path="/tasks">
                                <Feed />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <PrivateRoute exact path='/dashboard'>
                                <Dashboard />
                            </PrivateRoute>
                            <PrivateRoute exact path="/add_task">
                                <Dashboard />
                            </PrivateRoute>
                            <PrivateRoute exact path="/viewtask">
                                <Dashboard />
                            </PrivateRoute>
                            <PrivateRoute exact path='/messages'>
                                <Dashboard />
                            </PrivateRoute>
                            <PrivateRoute exact path='/task_history'>
                                <Dashboard />
                            </PrivateRoute>
                            <PrivateRoute exact path='/payment_history'>
                                <Dashboard />
                            </PrivateRoute>

                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </Box>

                </Switch>
            </>}

            <Footer />
        </ChakraProvider>
    );

}

export default App;
