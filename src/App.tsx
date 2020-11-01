import React from 'react';
import "./App.css"
import LoginPage from "./pages/loginpage/LoginPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RouterConstants} from "./routes/RouterConstants";
import TestPage from "./pages/test";
import DashboardRoute from "./routes/DashboardRoute";
import ClinicList from "./components/content/clinic/clinicslist/ClinicList";
import NotFound from "./components/content/notfound/NotFound";
import ClinicDetails from "./components/content/clinic/clinicdetails/ClinicDetails";
import {me} from "./services/AuthService";

export default class App extends React.Component<any, any> {

    componentDidMount() {
        me();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={RouterConstants.login} component={LoginPage}/>
                        <DashboardRoute exact path={RouterConstants.home} component={TestPage}/>
                        <DashboardRoute exact path={RouterConstants.departments} component={ClinicList}/>
                        <DashboardRoute exact path={RouterConstants.departmentDetails} component={ClinicDetails}/>
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>)
    }
}

