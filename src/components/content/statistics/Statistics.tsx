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

interface Props extends WithTranslation {

}

interface State {

    clientsStatistics: number [],
    vaccinationsStatistics: number [],

    isLoading: boolean
    isError: boolean
}


class Statistics extends React.Component<Props, State> {
    state: Readonly<State> = {

        clientsStatistics: new Array(12),
        vaccinationsStatistics: new Array(12),
        isLoading: false,
        isError: false,
    }

    componentDidMount() {
        this.loadStatistics();
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

    _renderStatistics = (): ReactNode => {
        let t = this.props.t
        let clientsStatistics = this.state.clientsStatistics
        let vaccinationsStatistics = this.state.vaccinationsStatistics
        return (
            <div className="row mb-5">
                <div className="col-12">
                    <h5 className="card-title">Použité diagnózy:</h5>
                </div>
                <div className="col-12">
                    <div className="card card-wo-hover">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title">Různých zvířat mělo report za každý měsíc v roce
                                        2020: </h5>
                                    <div className="row">
                                        <div className="col-5">
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
                                        <div className="col-5">
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
                    <div className="col-12">
                        <div className="card card-wo-hover">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title">Operací typu Vakcinace na reportech za každý měsíc v
                                            roce 2020: </h5>
                                        <div className="row">
                                            <div className="col-5">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Leden:
                                                        <span
                                                            className="badge badge-primary badge-pill">{vaccinationsStatistics[0]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Únor:
                                                        <span
                                                            className="badge badge-primary badge-pill">{vaccinationsStatistics[1]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Březen:
                                                        <span
                                                            className="badge badge-primary badge-pill">{vaccinationsStatistics[2]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Duben:
                                                        <span
                                                            className="badge badge-primary badge-pill">{vaccinationsStatistics[3]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Květen:
                                                        <span
                                                            className="badge badge-primary badge-pill">{vaccinationsStatistics[4]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Červen:
                                                        <span
                                                            className="badge badge-primary badge-pill">{vaccinationsStatistics[5]}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-5">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Červenec:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[6]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Srpen:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[7]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Září:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[8]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Říjen:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[9]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Listopad:
                                                        <span
                                                            className="badge badge-primary badge-pill">{clientsStatistics[10]}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        Prosinec:
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
                </div>
            </div>
        )
    }

    render() {
        let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                <div className="row mb-5">
                    <div className="col">
                        <h1>{t("statistics")}</h1>
                    </div>
                </div>
                {this._renderStatistics()}
            </div>
        );
    }
}

export default withTranslation()(Statistics)