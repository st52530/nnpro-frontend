import React from "react";
import {Route, Redirect, RouteComponentProps} from "react-router-dom";
import {isLoggedIn} from "../services/AuthService";
import {RouteProps} from "react-router";
import {RouterConstants} from "./RouterConstants";
import DashboardContainer from "../components/content/dashboardcontainer/DashboardContainer";
import {UserRole} from "../entities/User";
import DataStorage from "../services/DataStorage";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    access? : UserRole[]
}

export class DashboardRoute extends Route<Props> {
    render() {
        const {component: Component, ...rest}: Props = this.props;
        if (!isLoggedIn()) {
            return (
                <Route {...rest} render={props => <Redirect to={RouterConstants.login}/>}/>
            );
        }
        if (this.props.access && this.props.access.filter(r => r !== DataStorage.currentUser?.roles).length > 0) {
            return (
                <Route {...rest} render={props => <Redirect to={RouterConstants.notFound}/>}/>
            );
        }
        return <Route {...rest} render={props => (
            <DashboardContainer>
                <Component {...props} />
            </DashboardContainer>
        )}/>


    }
}

export default DashboardRoute;