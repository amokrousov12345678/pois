import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";

import {NotificationContainer} from 'react-notifications';
import "react-notifications/lib/notifications.css";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PassRecoverPage from "../pages/PassRecoverPage";
import PassResetPage from "../pages/PassResetPage";

import RoutesWithNavigationMenu from "./RoutesWithNavigationMenu";

function App() {
    return (
    <div>
        <Header />
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/passRecover" component={PassRecoverPage} />
            <Route path="/passReset" component={PassResetPage} />
            <RoutesWithNavigationMenu />
        </Switch>
        <NotificationContainer />
    </div>
    )
}

export default App;
