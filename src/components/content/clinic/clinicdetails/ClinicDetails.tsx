import {Component, ReactNode} from "react";
import React from "react";

import {RouteComponentProps, withRouter} from "react-router";
import {deleteClinic, getClinic} from "../../../../services/ClinicService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import i18n from "../../../../i18n";
import "./ClinicDetails.css"

import Clinic from "../../../../entities/Clinic";

import Staff from "../../../../entities/Staff";
import {getStaffByClinic} from "../../../../services/StaffService";
import ClinicStaffListItem from "./ClinicStaffListItem";

import Medicine from "../../../../entities/Medicine";
import { getMedicineByClinic } from "../../../../services/MedicineService";
import ClinicMedicineListItem from "./ClinicMedicineListItem";

import Consumable from "../../../../entities/Consumable";
import { getConsumableByClinic } from "../../../../services/ConsumableService";
import ClinicConsumableListItem from "./ClinicConsumableListItem";

import { Col, Nav, Row, Tab } from "react-bootstrap";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading : boolean,
    isOpenDeleteDialog : boolean
    clinic : Clinic
    staff : Staff[]
    medicine : Medicine[]
    consumables : Consumable[]

    isError : boolean,
    errorText? : string
}

class ClinicDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        clinic: {} as Clinic,
        staff : [],
        medicine : [],
        consumables : [],
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);

        getClinic(id).then(response => {
            this.setState({isLoading: false, clinic: response})
        }).catch(reason => {
            this.setState({isError : true, isLoading : false});
        })

        getStaffByClinic(id).then(value => {
            this.setState({staff : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })

        getMedicineByClinic(id).then(value => {
            this.setState({medicine : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })

        getConsumableByClinic(id).then(value => {
            this.setState({consumables : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    private onDeleteButtonClick = (): void => {
        this.setState({isOpenDeleteDialog: true})
    }

    private onDeleteSubmit = (): void => {
        this.setState({isOpenDeleteDialog: false, isLoading : true})
        let id = Number(this.props.match.params.id);
        deleteClinic(id).then(resp => {
            this.props.history.push(RouterConstants.clinics);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = i18n.t("cpDelete");
        let body : string = i18n.t("cpDelete")+ ": " + this.state.clinic.name + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }

    _renderClinicStaffList = () : ReactNode => {

        let elements : ReactNode[] = this.state.staff.map(staff => {
            return <ClinicStaffListItem staff={staff} key={staff.idStaff}/>
        })

        if (elements.length == 0 || elements === undefined) {
            return (
                <p>{i18n.t("nothingFound")}</p>
            )
        }

        return (
            <div>
                {elements}
            </div>
        )
    }

    _renderClinicMedicineList = () : ReactNode => {

        let elements : ReactNode[] = this.state.medicine.map(medicine => {
            return <ClinicMedicineListItem medicine={medicine} key={medicine.idMedicine}/>
        })

        if (elements.length == 0 || elements === undefined) {
            return (
                <p>{i18n.t("nothingFound")}</p>
            )
        }

        return (
            <div>
                {elements}
            </div>
        )
    }

    _renderClinicConsumableList = () : ReactNode => {

        let elements : ReactNode[] = this.state.consumables.map(consumable => {
            return <ClinicConsumableListItem consumable={consumable} key={consumable.idConsumable}/>
        })

        if (elements.length == 0 || elements === undefined) {
            return (
                <p>{i18n.t("nothingFound")}</p>
            )
        }

        return (
            <div>
                {elements}
            </div>
        )
    }


    render() {
        let t = this.props.t;
        let clinic: Clinic = this.state.clinic;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
       
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                {this.renderDeleteDialog()}
                <div className="row mb-3 border-bottom">
                    <div className="col">
                        <h1>Klinika <span className="clinic-title">{clinic.name}</span></h1>
                        <p>Adresa: {clinic.address}</p>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-info px-4 mr-2">{t("update")}</button>
                        <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                    </div>
                </div>

                <Tab.Container id="left-tabs-example" defaultActiveKey="information">
                    <Row>
                        <Col sm={12} lg={3}>
                            <h5 className="mt-1 mb-3">Řízení</h5>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="information">Information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="medicine">Medicine</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="consumables">Consumables</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="information">
                                    <Row className="mb-3">
                                        <Col sm={12}><h3 className="mb-3">This week</h3></Col>
                                        <Col sm={12}>some data</Col>
                                    </Row>
                                    <Row>
                                        <Col><h3 className="mb-3">{t("cpStaff")}</h3></Col>
                                        <Col className="text-right"><button type="button" className="btn btn-success px-4" >+</button></Col>
                                    </Row>
                                    {this._renderClinicStaffList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="medicine">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("cpMedicine")}</h3></Col>
                                        <Col className="text-right"><button type="button" className="btn btn-success px-4" >+</button></Col>
                                    </Row>
                                    {this._renderClinicMedicineList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="consumables">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("cpConsumable")}</h3></Col>
                                        <Col className="text-right"><button type="button" className="btn btn-success px-4" >+</button></Col>
                                    </Row>
                                    {this._renderClinicConsumableList()}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
            )
    }
}

export default withTranslation()(withRouter(ClinicDetails))