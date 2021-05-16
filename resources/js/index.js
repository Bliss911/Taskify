import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./AppEntry";
import AuthProvider from "./contexts/AuthProvider";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("app")
);

