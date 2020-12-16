import React, {ReactNode} from "react";
import Loader from "../loader/Loader";
import {
    getStatisticsClients,
    getStatisticsDiagnosis,
    getStatisticsVaccination
} from "../../../services/StatisticService";
import "./Statistics.css"
import ErrorMessage from "../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import { getClinics } from "../../../services/ClinicService";
import Clinic from "../../../entities/Clinic";
import ClinicListItem from "../clinic/clinicslist/ClinicListItem";
import { Col, Row } from "react-bootstrap";
import Report, { ReportStatus } from "../../../entities/Report";
import { getReports } from "../../../services/ReportService";
import VisitListItem from "../visit/visitlist/VisitListItem";
import DataStorage from "../../../services/DataStorage";
import { UserRole } from "../../../entities/User";
import { me } from "../../../services/AuthService";
import Securable from "../../common/secureable/Securable";

interface Props extends WithTranslation {

}

interface State {
    clinics : Clinic[],
    reportsDone: Report[],
    reportsWaiting: Report[],

    clientsStatistics: number [],
    vaccinationsStatistics: number [],

    isLoading: boolean
    isError: boolean
}


class Statistics extends React.Component<Props, State> {
    state: Readonly<State> = {
        clinics : [],
        reportsDone: [],
        reportsWaiting: [],

        clientsStatistics: new Array(12),
        vaccinationsStatistics: new Array(12),
        isLoading: false,
        isError: false,
    }

    componentDidMount() {
        this.loadClinics();
        this.loadStatistics();
        this.loadReports();
    }

    loadStatistics = (): void => {
        this.setState({isLoading: true})
        for (let i = 1; i <= 12; i++) {
            getStatisticsClients(2020, i).then(value => {
                let clientsStatistics = this.state.clientsStatistics
                clientsStatistics[i - 1] = value
                this.setState({clientsStatistics: clientsStatistics, isLoading: false});
            }).catch(reason => {
                this.setState({isLoading: false, isError: true,})
            })
        }
        for (let i = 1; i <= 12; i++) {
            getStatisticsVaccination(2020, i).then(value => {
                let vaccinationsStatistics = this.state.vaccinationsStatistics
                vaccinationsStatistics[i - 1] = value
                this.setState({vaccinationsStatistics: vaccinationsStatistics, isLoading: false});
            }).catch(reason => {
                this.setState({isLoading: false, isError: true,})
            })
        }
    }

    loadClinics = () : void => {
        this.setState({isLoading : true})
        getClinics().then(value => {
            this.setState({clinics : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    loadReports = (): void => {
        this.setState({isLoading: true})
        getReports()
            .then(value => {
                this.setState({
                    reportsDone: value.filter(r => r.reportState === ReportStatus.DONE),
                    reportsWaiting: value.filter(r => r.reportState === ReportStatus.READY), 
                    isLoading: false
                });
            }).catch(reason => {
            this.setState({isLoading: false, isError: true,})
        })
    }

    _renderClinics = () : ReactNode => {
        let elements : ReactNode[] = this.state.clinics.map(clinic => {            
            return <ClinicListItem 
                clinic={clinic} 
                key={clinic.idClinic}/>
        })

        return (
            <Row>
                <Col>
                    {elements}
                </Col>
            </Row>
        )
    }

    _renderVisitList = (reports: Report[]): ReactNode => {

        let elements: ReactNode[] = reports.reverse().slice(0, 3).map(report => {
            return <VisitListItem report={report} key={report.idReport}/>
        })

        return (
            <div className="row">
                <div className="col">
                    {elements}
                </div>
            </div>
        )
    }

    _renderVisits = () : ReactNode => {

        return (
            <div>
                <Row >
                    <Col>
                        <h4>Nadcházející návštěvy  (Poslední 3)</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this._renderVisitList(this.state.reportsWaiting)}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h4>Minulé návštěvy (Poslední 3)</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this._renderVisitList(this.state.reportsDone)}
                    </Col>
                </Row>
            </div>
        )
    }

    _renderStatistics = (): ReactNode => {
        let t = this.props.t
        let clientsStatistics = this.state.clientsStatistics
        let vaccinationsStatistics = this.state.vaccinationsStatistics
        return (
            <div>
                <div className="row mb-5">
                    <div className="col-6">
                        <div className="card card-wo-hover">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title">Zvířata:</h5>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("January")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[0]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("February")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[1]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("March")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[2]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("April")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[3]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("May")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[4]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("June")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[5]}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("July")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[6]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("August")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[7]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("September")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[8]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("October")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[9]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("November")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[10]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {t("December")}:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[11]}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                            <div className="card card-wo-hover">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title">Operací typu Vakcinace: </h5>
                                            <div className="row">
                                                <div className="col-6">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("January")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[0]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("February")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[1]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("March")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[2]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("April")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[3]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("May")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[4]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("June")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[5]}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-6">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("July")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[6]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("August")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[7]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("September")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[8]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("October")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[9]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("November")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[10]}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                                            {t("December")}:
                                                            <span
                                                                className="badge badge-primary badge-pill">{vaccinationsStatistics[11]}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                <div className="row mb-2">
                    <div className="col">
                        <h1>Domovská stránka</h1>
                    </div>
                </div>
                <div className="row mb-5">
                        <div className="col-6">
                            <Securable access={[UserRole.ADMINISTRATOR]}>
                                    <h2 className="card-title">Kliniky</h2>
                                    
                                    {this._renderClinics()}
                            </Securable>
                        </div>
                        <div className="col-6">
                            <Securable access={[UserRole.VETERINARY]}>
                                <h2 className="card-title">Návštěvy</h2>

                                {this._renderVisits()}
                            </Securable>
                        </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12">
                        <h2 className="card-title">Statistiky</h2>

                        {this._renderStatistics()}
                    </div>
                </div>

                
            </div>
        );
    }
}

export default withTranslation()(Statistics)