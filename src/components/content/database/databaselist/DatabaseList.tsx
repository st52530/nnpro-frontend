import React, {ReactNode} from "react";
import Loader from "../../loader/Loader";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import {withTranslation, WithTranslation} from "react-i18next";
import { Accordion, Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import Medicine from "../../../../entities/Medicine";
import Consumable from "../../../../entities/Consumable";
import { getMedicines } from "../../../../services/MedicineService";
import { getConsumables } from "../../../../services/ConsumableService";
import { getDiagnoses, getOperations } from "../../../../services/DiagnosisService";
import Diagnosis from "../../../../entities/Diagnosis";
import i18n from "../../../../i18n";
import "./DatabaseList.css"
import { getOperationID, Operation } from "../../../../entities/Operation";

interface Props extends WithTranslation {

}

interface State {

    dataDiagnoses : Diagnosis[]
    dataMedicines : Medicine[]
    dataConsumables : Consumable[]
    dataOperations : Operation[]

    isLoading : boolean
    isError : boolean
}



class DatabaseList extends React.Component<Props, State> {
    state : Readonly<State> = {

        dataDiagnoses : [],
        dataMedicines : [],
        dataConsumables : [],
        dataOperations : [],

        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadMedicines();
        this.loadConsumables();
        this.loadDiagnoses();
        this.loadOperations();
    }

    loadMedicines = () : void => {
        this.setState({isLoading : true})

        getMedicines().then(value => {
            this.setState({dataMedicines : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    loadConsumables = () : void => {
        this.setState({isLoading : true})

        getConsumables().then(value => {
            this.setState({dataConsumables : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    loadDiagnoses = () : void => {
        this.setState({isLoading : true})

        getDiagnoses().then(value => {
            this.setState({dataDiagnoses : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }
    
    loadOperations = () : void => {
        this.setState({isLoading : true})

        getOperations().then(value => {
            this.setState({dataOperations : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    _renderListMedicines = () : ReactNode => {

        let elements : ReactNode[] = this.state.dataMedicines.map(medicine => {
            return (
                <Accordion className="mb-3 db-nohover">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {medicine.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p>Name: {medicine.name}</p>
                                <p>Code: {medicine.code}</p>
                                <p>Substances: {medicine.substances}</p>
                                <p>Animals: {medicine.targetAnimals}</p>
                                <p>Form: {medicine.form}</p>
                                <p>Data of approval: {medicine.dateOfApproval}</p>
                                <p>Number of approval: {medicine.numberOfApproval}</p>
                                <p>Approval holder: {medicine.approvalHolder}</p>
                                <p>Protection period: {medicine.protectionPeriod}</p>
                                <p>Type: {medicine.type}</p>
                                <p>Package size: {medicine.packageSize}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            );
        })

        if (elements.length == 0 || elements === undefined) { return <p>{i18n.t("nothingFound")}</p> }

        return <div>{elements}</div>
    }

    _renderListConsumables = () : ReactNode => {

        let elements : ReactNode[] = this.state.dataConsumables.map(consumable => {
            return (
                <Accordion className="mb-3 db-nohover">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {consumable.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p>Name: {consumable.name}</p>
                                <p>Code: {consumable.code}</p>
                                <p>Price: {consumable.price}</p>
                                <p>Name addition: {consumable.nameAddition}</p>
                                <p>Group type: {consumable.groupType}</p>
                                <p>Prescription designation: {consumable.prescriptionDesignation}</p>
                                <p>Unit of measure: {consumable.unitOfMeasure}</p>
                                <p>Producer: {consumable.producer}</p>
                                <p>Country of origin: {consumable.countryOfOrigin}</p>
                                <p>Date of expiration: {consumable.dateOfExpiration}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            );
        })

        if (elements.length == 0 || elements === undefined) { return <p>{i18n.t("nothingFound")}</p> }

        return <div>{elements}</div>
    }

    _renderListDiagnoses = () : ReactNode => {

        let elements : ReactNode[] = this.state.dataDiagnoses.map(diagnosis => {
            return (
                <Accordion className="mb-3 db-nohover">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {diagnosis.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p>Name: {diagnosis.name}</p>
                                <p>Type: {diagnosis.type}</p>
                                <p>Animals: {diagnosis.targetAnimals}</p>
                                <p>Symptoms: {diagnosis.symptoms}</p>
                                <p>Incubation period: {diagnosis.incubationPeriod}</p>
                                <p>Treatment: {diagnosis.treatment}</p>
                                <p>Prevention: {diagnosis.prevention}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            );
        })

        if (elements.length == 0 || elements === undefined) { return <p>{i18n.t("nothingFound")}</p> }

        return <div>{elements}</div>
    }

    _renderListOperations = () : ReactNode => {

        let elements : ReactNode[] = this.state.dataOperations.map(operation => {
            return (
                <Accordion className="mb-3 db-nohover">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {operation.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p>Name: {operation.name}</p>
                                <p>Price: {operation.price}</p>
                                <p>Type: {operation.type}</p>
                                <p>Description: {operation.description}</p>
                                <p>Length: {operation.length}</p>
                                <p>Note: {operation.note}</p>
                                <p>Animals: {operation.targetAnimals}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            );
        })

        if (elements.length == 0 || elements === undefined) { return <p>{i18n.t("nothingFound")}</p> }

        return <div>{elements}</div>
    }

    render() {
        let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                
                <Row className="mb-5">
                    <Col>
                        <h1>{t("dbPageTitle")}</h1>
                    </Col>
                </Row>
                    
                <Tab.Container id="left-tabs-example" defaultActiveKey="diagnoses">
                    <Row>
                        <Col sm={12} lg={3}>
                            <h5 className="mt-1 mb-3">{t("dbPageList")}</h5>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="diagnoses">{t("dbPageListDiagnoses")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="medicine">{t("dbPageListMedicine")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="consumables">{t("dbPageListConsumables")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="operations">{t("dbPageListOperations")}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="diagnoses">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("dbPageListDiagnoses")}</h3></Col>
                                    </Row>
                                    {this._renderListDiagnoses()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="medicine">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("dbPageListMedicine")}</h3></Col>
                                    </Row>
                                    {this._renderListMedicines()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="consumables">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("dbPageListConsumables")}</h3></Col>
                                    </Row>
                                    {this._renderListConsumables()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="operations">
                                    <Row>
                                        <Col><h3 className="mb-3">{t("dbPageListOperations")}</h3></Col>
                                    </Row>
                                    {this._renderListOperations()}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}

export default withTranslation()(DatabaseList)