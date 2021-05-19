import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";



const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const { isAuth } = useAuth()
    return (
        <Route
            path={path}
            {...rest}
            render={props =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute
