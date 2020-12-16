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
import {
    deleteMedicineByClinic,
    getMedicinesByClinic,
    saveNewMedicineByClinic,
    updateMedicineByClinic
} from "../../../../services/MedicineService";
import ClinicMedicineListItem from "./ClinicMedicineListItem";
import ClinicConsumable from "../../../../entities/ClinicConsumable";
import {
    deleteConsumableByClinic,
    getConsumablesByClinic,
    saveNewConsumableByClinic,
    updateConsumableByClinic
} from "../../../../services/ConsumableService";
import ClinicConsumableListItem from "./ClinicConsumableListItem";

import {Col, Nav, Row, Tab} from "react-bootstrap";
import AddEditStaffDialog from "../../staff/addeditstaffdialog/AddEditStaffDialog";
import {UserRole} from "../../../../entities/User";
import Securable from "../../../common/secureable/Securable";
import AddEditClinicDialog from "../addeditclinicdialog/AddEditClinicDialog";
import AddEditClinicMedicine from "../addEditDialogs/AddEditClinicMedicine";
import AddEditConsumableInClinicDialog from "../../consumables/addeditconsumabledialog/AddEditConsumableInClinicDialog";
import AddEdicClinicConsumable from "../addEditDialogs/AddEdicClinicConsumable";
import {me} from "../../../../services/AuthService";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading : boolean,
    deleteClinicOpen : boolean
    updateClinicOpen : boolean

    addNewStaffOpen : boolean
    addNewMedicineOpen : boolean
    addNewConsumableOpen : boolean

    editStaffOpen : boolean
    editStaff? : Staff

    editConsumableOpen : boolean
    editConsumable? : ClinicConsumable

    editMedicineOpen : boolean
    editMedicine? : ClinicMedicine

    clinic : Clinic
    staff : Staff[]
    clinicMedicine : ClinicMedicine[]
    consumables : ClinicConsumable[]

    isError : boolean,
    errorText? : string
}

class ClinicDetails extends Component<Props, State> {

    state: Readonly<State> = {
        editConsumableOpen: false,
        editMedicineOpen: false,
        isLoading: true,
        isError : false,
        deleteClinicOpen: false,
        updateClinicOpen: false,
        clinic: {} as Clinic,
        staff : [],
        clinicMedicine : [],
        consumables : [],

        addNewStaffOpen : false,
        editStaffOpen : false,
        addNewMedicineOpen : false,
        addNewConsumableOpen : false
    }

    componentDidMount() {
        this.loadClinic();
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

    loadClinic = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);

        getClinic(id).then(response => {
            this.setState({isLoading: false, clinic: response})
        }).catch(reason => {
            this.setState({isError : true, isLoading : false});
        })
    }

    onUpdateClinic = () : void => {
        let clinic = this.state.clinic;
        this.setState({updateClinicOpen : true})
    }

    onUpdateClinicSubmit = (clinic : Clinic) => {
        this.setState({updateClinicOpen : false, isLoading : true})
        updateClinic(clinic).then(value => {
            this.loadClinic();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onUpdateClinicCancel = () => {
        this.setState({updateClinicOpen : false})
    }

    onDeleteClinic = (): void => {
        this.setState({deleteClinicOpen: true})
    }

    onDeleteClinicSubmit = (): void => {
        this.setState({deleteClinicOpen: false, isLoading : true})
        let id = Number(this.props.match.params.id);
        deleteClinic(id).then(resp => {
            this.props.history.push(RouterConstants.clinics);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    onDeleteCancelClinic = (): void => {
        this.setState({deleteClinicOpen: false})
    }

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
        this.setState({addNewStaffOpen : false, editStaff : undefined})
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
        this.setState({addNewMedicineOpen: false, isLoading : true})
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

    onEditClinicMedicine = (medicine :ClinicMedicine) => {
        this.setState({editMedicineOpen : true, editMedicine : medicine})
    }

    onEditClinicMedicineSubmit = (med : ClinicMedicine) => {
        this.setState({editMedicineOpen: false, isLoading : true})
        med.clinic = this.state.clinic
        updateMedicineByClinic(med).then(e => {
            this.loadMedicines();
        }).catch(error => {
            this.setState({isError: true, isLoading : false});
        })
    }

    onEditClinicMedicineCancel = () => {
        this.setState({editMedicineOpen : false, editMedicine : undefined})
    }

    onDeleteClinicMedicine = (clinicMedicine : ClinicMedicine) => {
        this.setState({isLoading : true})
        deleteMedicineByClinic(clinicMedicine.idClinicMedicine).then(value => {
            this.loadMedicines();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onDeleteClinicConsumable = (clinicConsumable : ClinicConsumable) => {
        this.setState({isLoading : true})
        deleteConsumableByClinic(clinicConsumable.idClinicConsumable).then(value => {
            this.loadConsumables();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddClinicConsumable = () => {
        this.setState({addNewConsumableOpen : true})
    }

    onAddClinicConsumableSubmit = (med : ClinicConsumable) => {
        this.setState({addNewConsumableOpen: false, isLoading : true})
        med.clinic = this.state.clinic
        saveNewConsumableByClinic(med).then(e => {
            this.loadConsumables();
        }).catch(error => {
            this.setState({isError: true});
        })
    }

    onAddClinicConsumableCancel = () => {
        this.setState({addNewConsumableOpen: false})
    }

    onEditClinicConsumable = (medicine :ClinicConsumable) => {
        this.setState({editConsumableOpen : true, editConsumable : medicine})
    }

    onEditClinicConsumableSubmit = (med : ClinicConsumable) => {
        this.setState({editConsumableOpen: false, isLoading : true})
        med.clinic = this.state.clinic
        updateConsumableByClinic(med).then(e => {
            this.loadConsumables();
        }).catch(error => {
            this.setState({isError: true, isLoading : false});
        })
    }

    onEditClinicConsumableCancel = () => {
        this.setState({editConsumableOpen : false, editConsumable : undefined})
    }

    _renderDeleteClinicDialog = () : ReactNode => {
        let header : string = i18n.t("cpDelete");
        let body : string = i18n.t("cpDelete")+ ": " + this.state.clinic.name + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.deleteClinicOpen} onSubmit={this.onDeleteClinicSubmit} onCancel={this.onDeleteCancelClinic}/>
    }

    _renderClinicClinicConsumableDialog = () : ReactNode => {
        let header : string = i18n.t("cpDelete");
        let body : string = i18n.t("cpDelete")+ ": " + this.state.clinic.name + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.deleteClinicOpen} onSubmit={this.onDeleteClinicSubmit} onCancel={this.onDeleteCancelClinic}/>
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
            return <ClinicMedicineListItem onEdit={this.onEditClinicMedicine} onDelete={this.onDeleteClinicMedicine} clinicMedicine={clinicMedicine} key={clinicMedicine.medicine.idMedicine}/>
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
            return <ClinicConsumableListItem onEdit={this.onEditClinicConsumable} onDelete={this.onDeleteClinicConsumable} clinicConsumable={consumable} key={consumable.idClinicConsumable}/>
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

                <AddEditStaffDialog onSubmit={this.onAddNewStaffSubmit} onCancel={this.onAddNewStaffCancel} isOpen={this.state.addNewStaffOpen}/>
                <AddEditStaffDialog item={this.state.editStaff} onSubmit={this.onEditStaffSubmit} onCancel={this.onEditStaffCancel} isOpen={this.state.editStaffOpen}/>

                <AddEditClinicDialog item={this.state.clinic} onSubmit={this.onUpdateClinicSubmit} onCancel={this.onUpdateClinicCancel} isOpen={this.state.updateClinicOpen}/>

                <AddEditClinicMedicine isOpen={this.state.addNewMedicineOpen} onSubmit={this.onAddClinicMedicineSubmit} onCancel={this.onAddClinicMedicineCancel}/>
                <AddEditClinicMedicine item={this.state.editMedicine} isOpen={this.state.editMedicineOpen} onSubmit={this.onEditClinicMedicineSubmit} onCancel={this.onEditClinicMedicineCancel}/>

                <AddEdicClinicConsumable isOpen={this.state.addNewConsumableOpen} onSubmit={this.onAddClinicConsumableSubmit} onCancel={this.onAddClinicConsumableCancel}/>
                <AddEdicClinicConsumable item={this.state.editConsumable} isOpen={this.state.editConsumableOpen} onSubmit={this.onEditClinicConsumableSubmit} onCancel={this.onEditClinicConsumableCancel}/>

                {this._renderDeleteClinicDialog()}
                <div className="row mb-3 border-bottom">
                    <div className="col">
                        <h1>Klinika <span className="clinic-title">{clinic.name}</span></h1>
                        <p>Adresa: {clinic.address}</p>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Securable access={[UserRole.ADMINISTRATOR]}>
                            <button type="button" className="btn btn-info px-4 mr-2" onClick={this.onUpdateClinic}>{t("update")}</button>
                            <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteClinic}>{t("delete")}</button>
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
                                                <button type="button" className="btn btn-success px-4" onClick={this.onAddClinicConsumable}>+</button>
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