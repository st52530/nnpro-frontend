import React, {Component, ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import User, {UserRole} from "../../../../entities/User";
import {deleteClient, getClient} from "../../../../services/ClientService";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import AddEditAnimalDialog from "../../animal/addeditanimaldialog/AddEditAnimalDialog";
import {getAnimalsByClient, saveNewAnimal} from "../../../../services/AnimalService";
import Animal from "../../../../entities/Animal";
import i18n from "../../../../i18n";
import ClientAnimalsListItem from "./ClientAnimalsListItem";
import Reservation from "../../../../entities/Reservation";
import ClientReservationsListItem from "./ClientReservationsListItem";
import {getReservationsByClient} from "../../../../services/ReservationService";
import DataStorage from "../../../../services/DataStorage";
import Securable from "../../../common/secureable/Securable";
import {updateClient} from "../../../../services/ClientService";
import {getClinic} from "../../../../services/ClinicService";
import AddEditClientDialog from "../addeditclientdialog/AddEditClientDialog";

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

    addNewAnimalOpen : boolean
    updateClientOpen : boolean

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
        client: {} as User,
        animals: [],
        reservations: []
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
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })

        getReservationsByClient(id).then(value => {
            this.setState({reservations : value, isLoading : false});
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

    _renderClientAnimalsList = () : ReactNode => {

        let elements : ReactNode[] = this.state.animals.map(animal => {
            return <ClientAnimalsListItem animals={animal} key={animal.idAnimal}/>
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


    render() {
        let t = this.props.t;
        let client: User = this.state.client;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                <AddEditAnimalDialog onSubmit={this.onAddNewAnimalSubmit} onCancel={this.onAddNewAnimalCancel} isOpen={this.state.addNewAnimalOpen}/>
                <AddEditClientDialog onSubmit={this.onUpdateClientSubmit} onCancel={this.onUpdateClientCancel} isOpen={this.state.updateClientOpen}/>
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
                            </Nav>
                        </Col>
                        <Col sm={12} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="information">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageInformation")}</h3></Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="animals">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageAnimals")}</h3></Col>
                                        <Col className="text-right">
                                            <Securable access={[UserRole.ADMINISTRATOR]}>
                                                <button type="button" onClick={this.onAddNewAnimal} className="btn btn-success px-4" >+</button>
                                            </Securable>
                                        </Col>
                                    </Row>
                                    {this._renderClientAnimalsList()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="reservations">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("clientPageReservations")}</h3></Col>
                                        <Col className="text-right">
                                            <Securable access={[UserRole.ADMINISTRATOR, UserRole.VETERINARY_TECHNICIAN]}>
                                                <button type="button" className="btn btn-success px-4" >+</button>
                                            </Securable>
                                        </Col>
                                    </Row>
                                    {this._renderClientReservationsList()}
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