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
import ClientList from "./components/content/client/clientslist/ClientList";
import ClientDetails from "./components/content/client/clientdetails/ClientDetails";
import StaffList from "./components/content/staff/stafflist/StaffList";
import StaffDetails from "./components/content/staff/staffdetails/StaffDetails";
import MedicineDetails from "./components/content/medicine/medicinedetails/MedicineDetails";
import MedicineList from "./components/content/medicine/medicinelist/MedicineList";
import ReservationDetails from "./components/content/reservation/reservationdetails/ReservationDetails";
import ReservationList from "./components/content/reservation/reservationlist/ReservationList";
import AnimalList from "./components/content/animal/animallist/AlnimalList";
import AnimalDetails from "./components/content/animal/animaldetails/AnimalDetails";
import DateStorage from "./services/DataStorage";
import ImportFromExcel from "./components/content/importfromexcel/ImportFromExcel";

export default class App extends React.Component<any, any> {

    componentDidMount() {
        me().then(user => {
            if (user) {
                DateStorage.initStorages();
            }
        })

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={RouterConstants.login} component={LoginPage}/>
                        <DashboardRoute exact path={RouterConstants.home} component={TestPage}/>
                        <DashboardRoute exact path={RouterConstants.clinics} component={ClinicList}/>
                        <DashboardRoute exact path={RouterConstants.clinicDetails} component={ClinicDetails}/>
                        <DashboardRoute exact path={RouterConstants.clients} component={ClientList}/>
                        <DashboardRoute exact path={RouterConstants.clientDetails} component={ClientDetails}/>
                        <DashboardRoute exact path={RouterConstants.staff} component={StaffList}/>
                        <DashboardRoute exact path={RouterConstants.staffDetails} component={StaffDetails}/>
                        <DashboardRoute exact path={RouterConstants.medicine} component={MedicineList}/>
                        <DashboardRoute exact path={RouterConstants.medicineDetails} component={MedicineDetails}/>
                        <DashboardRoute exact path={RouterConstants.reservation} component={ReservationList}/>
                        <DashboardRoute exact path={RouterConstants.reservationDetails} component={ReservationDetails}/>
                        <DashboardRoute exact path={RouterConstants.animals} component={AnimalList}/>
                        <DashboardRoute exact path={RouterConstants.animalDetails} component={AnimalDetails}/>
                        <DashboardRoute exact path={RouterConstants.import} component={ImportFromExcel}/>
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>)
    }
}

