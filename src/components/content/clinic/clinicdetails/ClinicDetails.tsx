import React, {Component, ReactNode} from "react";

import {RouteComponentProps, withRouter} from "react-router";
import {deleteClinic, getClinic, updateClinic} from "../../../../services/ClinicService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import i18n from "../../../../i18n";
import "./ClinicDetails.css"

import Clinic from "../../../../entities/Clinic";

import Staff from "../../../../entities/Staff";
import {deleteStaff, getAllStaff, getStaffByClinic, saveNewStaff, updateStaff} from "../../../../services/StaffService";
import ClinicStaffListItem from "./ClinicStaffListItem";

import ClinicMedicine from "../../../../entities/ClinicMedicine";
import {getMedicinesByClinic, saveNewMedicineByClinic} from "../../../../services/MedicineService";
import ClinicMedicineListItem from "./ClinicMedicineListItem";
import ClinicConsumable from "../../../../entities/ClinicConsumable";
import {getConsumablesByClinic, saveNewConsumableByClinic} from "../../../../services/ConsumableService";
import ClinicConsumableListItem from "./ClinicConsumableListItem";

import {Col, Nav, Row, Tab} from "react-bootstrap";
import AddEditStaffDialog from "../../staff/addeditstaffdialog/AddEditStaffDialog";
import {UserRole} from "../../../../entities/User";
import Securable from "../../../common/secureable/Securable";
import AddEditClinicDialog from "../addeditclinicdialog/AddEditClinicDialog";
import AddEditClinicMedicine from "../addEditDialogs/AddEditClinicMedicine";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading : boolean,
    isOpenDeleteDialog : boolean
    isOpenUpdateDialog : boolean
    addNewStaffOpen : boolean
    addNewMedicineOpen : boolean
    addNewConsumableOpen : boolean

    clinic : Clinic
    staff : Staff[]
    clinicMedicine : ClinicMedicine[]
    consumables : ClinicConsumable[]

    editStaffOpen : boolean
    editStaff? : Staff

    updateClinic? : Clinic

    isError : boolean,
    errorText? : string
}

class ClinicDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        isOpenUpdateDialog: false,
        clinic: {} as Clinic,
        staff : [],
        clinicMedicine : [],
        consumables : [],
        
        addNewStaffOpen : false,
        editStaffOpen : false,
        addNewMedicineOpen : false,
        addNewConsumableOpen : false,
    }

    componentDidMount() {
        this.loadData();
        this.loadStaff();
        this.loadMedicines();
        this.loadConsumables();
    }
    
    loadStaff = () : void => {
        this.setState({isLoading : true})
        let clinicId = Number(this.props.match.params.id);
        getStaffByClinic(clinicId).then(value => {
            this.setState({staff : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }
    
    loadMedicines = () : void => {
        this.setState({isLoading : true})
        let clinicId = Number(this.props.match.params.id);
        getMedicinesByClinic(clinicId).then(value => {
            this.setState({clinicMedicine : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    loadConsumables = () : void => {
        this.setState({isLoading : true})
        let clinicId = Number(this.props.match.params.id);
        getConsumablesByClinic(clinicId).then(value => {
            this.setState({consumables : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);

        getClinic(id).then(response => {
            this.setState({isLoading: false, clinic: response})
        }).catch(reason => {
            this.setState({isError : true, isLoading : false});
        })
    }

    /* UPDATE */

    onUpdateClinic = () : void => {
        let clinic = this.state.clinic;
        this.setState({isOpenUpdateDialog : true, updateClinic : clinic})
    }

    onUpdateClinicSubmit = (clinic : Clinic) => {
        this.setState({isOpenUpdateDialog : false, isLoading : true})
        updateClinic(clinic).then(value => {
            this.setState({updateClinic : undefined})
            this.loadData();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onUpdateClinicCancel = () => {
        this.setState({isOpenUpdateDialog : false, updateClinic : undefined})
    }


    /* DELETE */
    

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
            return <ClinicStaffListItem onEdit={this.onEditStaff} onDelete={this.onDeleteStaff} staff={staff} key={staff.idUser}/>
        })

        if (elements.length === 0 || elements === undefined) {
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

        let elements : ReactNode[] = this.state.clinicMedicine.map(clinicMedicine => {
            return <ClinicMedicineListItem clinicMedicine={clinicMedicine} key={clinicMedicine.medicine.idMedicine}/>
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
            return <ClinicConsumableListItem clinicConsumable={consumable} key={consumable.idClinicConsumable}/>
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



    /* Staff */
    
    onAddNewStaff = () : void => {
        this.setState({addNewStaffOpen : true})
    }

    onAddNewStaffSubmit = (staff : Staff) => {
        this.setState({addNewStaffOpen : false, isLoading : true})
        let id = parseInt(this.props.match.params.id)
        saveNewStaff(staff, id).then(value => {
            this.loadStaff();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewStaffCancel = () => {
        this.setState({editStaffOpen : false, editStaff : undefined})
    }

    onEditStaff = (staff : Staff) : void => {
        this.setState({editStaffOpen : true, editStaff : staff})
    }

    onEditStaffSubmit = (staff : Staff) => {
        this.setState({editStaffOpen : false, isLoading : true})
        let clinicId = Number(this.props.match.params.id);
        updateStaff(staff, clinicId).then(value => {
            this.setState({editStaff : undefined})
            this.loadStaff();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onEditStaffCancel = () => {
        this.setState({editStaffOpen : false, editStaff : undefined})
    }

    onDeleteStaff = (staff : Staff) => {
        this.setState({isLoading : true})
        console.log(staff)
        deleteStaff(staff.idUser).then(value => {
            this.loadStaff();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddClinicMedicine = () => {
        this.setState({addNewMedicineOpen : true})
    }

    onAddClinicMedicineSubmit = (med : ClinicMedicine) => {
        this.setState({addNewMedicineOpen: false})
        med.clinic = this.state.clinic
        saveNewMedicineByClinic(med).then(e => {
            this.loadMedicines();
        }).catch(error => {
            this.setState({isError: true});
        })
    }


    onAddClinicMedicineCancel = () => {
        this.setState({addNewMedicineOpen : false})
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
                <AddEditStaffDialog onSubmit={this.onAddNewStaffSubmit} onCancel={this.onAddNewStaffCancel} isOpen={this.state.addNewStaffOpen}/>
                <AddEditStaffDialog item={this.state.editStaff} onSubmit={this.onEditStaffSubmit} onCancel={this.onAddNewStaffCancel} isOpen={this.state.editStaffOpen}/>
                <AddEditClinicDialog item={this.state.clinic} onSubmit={this.onUpdateClinicSubmit} onCancel={this.onUpdateClinicCancel} isOpen={this.state.isOpenUpdateDialog}/>
                <AddEditClinicMedicine isOpen={this.state.addNewMedicineOpen} onSubmit={this.onAddClinicMedicineSubmit} onCancel={this.onAddClinicMedicineCancel}/>
                {this.renderDeleteDialog()}
                <div className="row mb-3 border-bottom">
                    <div className="col">
                        <h1>Klinika <span className="clinic-title">{clinic.name}</span></h1>
                        <p>Adresa: {clinic.address}</p>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Securable access={[UserRole.ADMINISTRATOR]}>
                            <button type="button" className="btn btn-info px-4 mr-2" onClick={this.onUpdateClinic}>{t("update")}</button>
                            <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                        </Securable>
                    </div>
                </div>

                <Tab.Container id="left-tabs-example" defaultActiveKey="personal">
                    <Row>
                        <Col sm={12} lg={3}>
                            <h5 className="mt-1 mb-3">Řízení</h5>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="personal">{t("cpStaff")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="medicine">{t("cpMedicine")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="consumables">{t("cpConsumable")}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="personal">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("cpStaff")}</h3></Col>
                                        <Col className="text-right">
                                            <Securable access={[UserRole.ADMINISTRATOR]}>
                                                <button type="button" className="btn btn-success px-4" onClick={this.onAddNewStaff}>+</button>
                                            </Securable>
                                        </Col>
                                    </Row>
                                    {this._renderClinicStaffList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="medicine">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("cpMedicine")}</h3></Col>
                                        <Col className="text-right">
                                            <Securable access={[UserRole.ADMINISTRATOR]}>
                                                <button type="button" className="btn btn-success px-4" onClick={this.onAddClinicMedicine}>+</button>
                                            </Securable>
                                        </Col>
                                    </Row>
                                    {this._renderClinicMedicineList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="consumables">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("cpConsumable")}</h3></Col>
                                        <Col className="text-right">
                                            <Securable access={[UserRole.ADMINISTRATOR]}>
                                                <button type="button" className="btn btn-success px-4">+</button>
                                            </Securable>
                                        </Col>
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