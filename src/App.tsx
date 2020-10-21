import React from 'react';
import "./App.css"
import LoginPage from "./pages/loginpage/LoginPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RouterConstants} from "./routes/RouterConstants";
import TestPage from "./pages/test";
import DashboardRoute from "./routes/DashboardRoute";
import DepartmentsList from "./components/content/departmentslist/DepartmentsList";
import NotFound from "./components/content/notfound/NotFound";

export default class App extends React.Component<any, any> {


    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={RouterConstants.login} component={LoginPage}/>
                        <DashboardRoute exact path={RouterConstants.home} component={TestPage}/>
                        <DashboardRoute exact path={RouterConstants.departments} component={DepartmentsList}/>

                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>)
    }
}

