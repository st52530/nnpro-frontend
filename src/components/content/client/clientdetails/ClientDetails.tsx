import React, {Component, ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import User, {UserRole} from "../../../../entities/User";
import {deleteClient, getClient, updateClient} from "../../../../services/ClientService";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import AddEditAnimalDialog from "../../animal/addeditanimaldialog/AddEditAnimalDialog";
import {getAnimalsByClient, getMessagesByAnimal, saveNewAnimal} from "../../../../services/AnimalService";
import Animal from "../../../../entities/Animal";
import i18n from "../../../../i18n";
import ClientAnimalListItem from "./ClientAnimalListItem";
import Reservation from "../../../../entities/Reservation";
import ClientReservationsListItem from "./ClientReservationsListItem";
import {getReservationsByClient} from "../../../../services/ReservationService";
import DataStorage from "../../../../services/DataStorage";
import Securable from "../../../common/secureable/Securable";
import AddEditClientDialog from "../addeditclientdialog/AddEditClientDialog";
import AddVisitDialog from "../../visit/addvisitdialog/AddVisitDialog";
import Report from "../../../../entities/Report";
import {getReportsByClient, saveNewReport} from "../../../../services/ReportService";
import ClientReportsListItem from "./ClientReportsListItem";
import AnimalMessage from "../../../../entities/AnimalMessage";
import AddMessageDialog from "../../message/addmessageform/AddMessageDialog";
import {saveNewMessage} from "../../../../services/MessageService";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading: boolean,
    isOpenDeleteDialog: boolean
    client: User
    animals: Animal[]
    reservations: Reservation[]
    reports: Report[]
    messages: AnimalMessage[]

    addNewAnimalOpen : boolean
    updateClientOpen : boolean

    addVisitOpen : boolean
    addVisitEntity? : Report

    addMessageOpen : boolean
    addMessageEntity? : AnimalMessage

    isError : boolean,
    errorText? : string
}

class ClientDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        addNewAnimalOpen: false,
        updateClientOpen : false,
        addVisitOpen: false,
        addMessageOpen: false,
        client: {} as User,
        animals: [],
        reservations: [],
        reports: [],
        messages: []
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        DataStorage.currentClient = undefined
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);        
        this.setState({isLoading : true})

        getClient(id).then(response => {
            this.setState({isLoading: false, client: response})
            DataStorage.currentClient = response
        }).catch(reason => {
            this.setState({isError : true, isLoading : false});
        })

        getAnimalsByClient(id).then(value => {
            this.setState({animals : value, isLoading : false});
        }).then(resp => {
            this.loadMessages();
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })

        getReservationsByClient(id).then(value => {
            this.setState({reservations : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })

        getReportsByClient(id).then(value => {
            this.setState({reports : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    private loadMessages = () => {
        this.state.animals.forEach(animal => {
            getMessagesByAnimal(animal.idAnimal).then(value => {
                this.setState({messages : this.state.messages.concat(value), isLoading : false});
            }).catch(reason =>{
                this.setState({isLoading : false, isError : true, })
            })
        });
    }


    private onDeleteButtonClick = (): void => {
        this.setState({isOpenDeleteDialog: true})
    }

    private onDeleteSubmit = (): void => {
        this.setState({isOpenDeleteDialog: false, isLoading : true})
        let id = Number(this.props.match.params.id);
        deleteClient(id).then(resp => {
            this.props.history.push(RouterConstants.clients);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = "Delete client";
        let body : string = "Delete client: " + this.state.client.fullName + " ?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }

    loadClient = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);

        getClient(id).then(response => {
            this.setState({isLoading: false, client: response})
        }).catch(reason => {
            this.setState({isError : true, isLoading : false});
        })
    }

    onUpdateClient = () : void => {
        let client = this.state.client;
        this.setState({updateClientOpen : true})
    }

    onUpdateClientSubmit = (client : User) => {
        this.setState({updateClientOpen : false, isLoading : true})
        updateClient(client).then(value => {
            this.loadClient();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onUpdateClientCancel = () => {
        this.setState({updateClientOpen : false})
    }

    onAddNewAnimal = () : void => {
        this.setState({addNewAnimalOpen : true})
    }

    onAddNewAnimalSubmit = (animal : Animal) => {
        this.setState({addNewAnimalOpen : false, isLoading : true})
        let id = parseInt(this.props.match.params.id)
        saveNewAnimal(animal, id).then(value => { 
            this.loadData();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewAnimalCancel = () => {
        this.setState({addNewAnimalOpen : false})
    }

    onAddVisit = (animal : Animal) => {
        let report = {} as Report
        animal.owner = null
        report.animal = animal
        this.setState({addVisitOpen : true, addVisitEntity : report})
    }

    onAddVisitSubmit = (report : Report) => {
        this.setState({addVisitOpen: false, addVisitEntity : undefined, isLoading : true})
        saveNewReport(report).then(resp => {
            this.setState({isLoading : false})
        }).catch(error => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddVisitCancel = () => {
        this.setState({addVisitOpen : false, addVisitEntity : undefined})
    }

    onAddMessage = () => {
        let message = {} as AnimalMessage
        this.setState({addMessageOpen : true, addMessageEntity : message})
    }

    onAddMessageSubmit = (message : AnimalMessage) => {
        this.setState({addMessageOpen: false, addMessageEntity : undefined, isLoading : true})
        //if (DataStorage.currentUser) {
        //    message.text = DataStorage.currentUser.fullName + ": " + message.text;
        //}

        saveNewMessage(message).then(resp => {
            this.loadMessages();
        }).catch(error => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddMessageCancel = () => {
        this.setState({addVisitOpen : false, addVisitEntity : undefined})
    }

    _renderClientAnimalsList = () : ReactNode => {

        let elements : ReactNode[] = this.state.animals.map(animal => {
            return <ClientAnimalListItem onAdd={this.onAddVisit} animals={animal} key={animal.idAnimal}/>
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

    _renderClientReservationsList = () : ReactNode => {

        let elements : ReactNode[] = this.state.reservations.map(reservation => {
            return <ClientReservationsListItem reservation={reservation} key={reservation.idReservation}/>
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

    _renderClientMessagesList = () : ReactNode => {

        let elements : ReactNode[] = this.state.messages.map(message => {
            return <div>
                <Row>
                    <Col md={3}>
                        {message.animal.name}
                    </Col>
                    <Col md={6}>
                        {message.text}
                    </Col>
                    <Col md={3}>
                        {message.sender.fullName}
                        <br/>
                        {new Date(message.date).toUTCString()}
                    </Col>
                </Row>

            </div>;
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

    _renderClientReportsList = () : ReactNode => {

        let elements : ReactNode[] = this.state.reports.map(report => {
            return <ClientReportsListItem report={report} key={report.idReport}/>
        })

        if (elements === undefined || elements.length == 0) {
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
        let id = Number(this.props.match.params.id);
        let params : {[key : string] : string} = {
            clientId : String(id)
        }


        let t = this.props.t;
        let client: User = this.state.client;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                <AddEditAnimalDialog onSubmit={this.onAddNewAnimalSubmit} onCancel={this.onAddNewAnimalCancel} isOpen={this.state.addNewAnimalOpen}/>
                <AddEditClientDialog item={this.state.client} onSubmit={this.onUpdateClientSubmit} onCancel={this.onUpdateClientCancel} isOpen={this.state.updateClientOpen}/>
               
                <AddVisitDialog isOpen={this.state.addVisitOpen} item={this.state.addVisitEntity} onSubmit={this.onAddVisitSubmit} onCancel={this.onAddVisitCancel}/>
                <AddMessageDialog isOpen={this.state.addMessageOpen} item={this.state.addMessageEntity} onSubmit={this.onAddMessageSubmit} onCancel={this.onAddMessageCancel} params={params}/>
                
                {this.renderDeleteDialog()}
                <div className="row mb-3 border-bottom">
                    <div className="col">
                        <h1>Klient <span className="client-title">{client.fullName}</span></h1>
                        <p>{client.email}</p>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Securable access={[UserRole.ADMINISTRATOR]}>
                            <button type="button" className="btn btn-info px-4 mr-2" onClick={this.onUpdateClient}>{t("update")}</button>
                            <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                        </Securable>
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
                                    <Nav.Link eventKey="animals">Zvířata</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="reservations">Rezervace</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="messages">Zprávy</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="information">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageInformation")}</h3></Col>
                                    </Row>
                                    {this._renderClientReportsList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="animals">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageAnimals")}</h3></Col>
                                        <Col className="text-right">
                                            <Securable access={[UserRole.ADMINISTRATOR, UserRole.VETERINARY_TECHNICIAN]}>
                                                <button type="button" onClick={this.onAddNewAnimal} className="btn btn-success px-4" >+</button>
                                            </Securable>
                                        </Col>
                                    </Row>
                                    {this._renderClientAnimalsList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="reservations">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageReservations")}</h3></Col>
                                    </Row>
                                    {this._renderClientReservationsList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="messages">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageMessages")}</h3></Col>
                                    </Row>
                                    <button type="button" onClick={this.onAddMessage} className="btn btn-success px-4 w-100 mb-5" >Add</button>  

                                    <Row>
                                        <Col md={3}>
                                            <h6>Zvíře</h6>
                                        </Col>
                                        <Col md={6}>
                                            <h6>Zpráva</h6>
                                        </Col>
                                        <Col md={3}>
                                            <h6>ODESÍLATEL</h6>
                                        </Col>
                                    </Row>                                         
                                    {this._renderClientMessagesList()}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ClientDetails))