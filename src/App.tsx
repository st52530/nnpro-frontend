import React from 'react';
import "./App.css"
import LoginPage from "./pages/loginpage/LoginPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RouterConstants} from "./routes/RouterConstants";
import TestPage from "./pages/test";
import DashboardRoute from "./routes/DashboardRoute";

export default class App extends React.Component<any, any> {


    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path={RouterConstants.login} component={LoginPage}/>
                        <DashboardRoute path={RouterConstants.home} component={TestPage}/>
                    </Switch>
                </BrowserRouter>
            </div>)
    }
}

