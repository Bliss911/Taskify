import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./AppEntry";
import AuthProvider from "./contexts/AuthProvider";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import GeneralProvider from "./contexts/GeneralProvider";

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <GeneralProvider>

                <App />
            </GeneralProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("app")
);

