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
        let t = this.props.t;

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
                                <p>{t('dbName')}: {medicine.name}</p>
                                <p>{t('dbCode')}: {medicine.code}</p>
                                <p>{t('dbSubstances')}: {medicine.substances}</p>
                                <p>{t('dbAnimals')}: {medicine.targetAnimals}</p>
                                <p>{t('dbForm')}: {medicine.form}</p>
                                <p>{t('dbDateOfApproval')}: {medicine.dateOfApproval}</p>
                                <p>{t('dbNumberOfApproval')}: {medicine.numberOfApproval}</p>
                                <p>{t('dbApprovalHolder')}: {medicine.approvalHolder}</p>
                                <p>{t('dbProtectionPeriod')}: {medicine.protectionPeriod}</p>
                                <p>{t('dbType')}: {medicine.type}</p>
                                <p>{t('dbPackageSize')}: {medicine.packageSize}</p>
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
        let t = this.props.t;

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
                                <p>{t('dbName')}: {consumable.name}</p>
                                <p>{t('dbCode')}: {consumable.code}</p>
                                <p>{t('dbPrice')}: {consumable.price}</p>
                                <p>{t('dbNameAddition')}: {consumable.nameAddition}</p>
                                <p>{t('dbGroupType')}: {consumable.groupType}</p>
                                <p>{t('dbPrescriptionDesignation')}: {consumable.prescriptionDesignation}</p>
                                <p>{t('dbUnitMeasure')}: {consumable.unitOfMeasure}</p>
                                <p>{t('dbProducer')}: {consumable.producer}</p>
                                <p>{t('dbCountryOrigin')}: {consumable.countryOfOrigin}</p>
                                <p>{t('dbDateExpiration')}: {consumable.dateOfExpiration}</p>
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
        let t = this.props.t;

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
                                <p>{t('dbName')}: {diagnosis.name}</p>
                                <p>{t('dbType')}: {diagnosis.type}</p>
                                <p>{t('dbAnimals')}: {diagnosis.targetAnimals}</p>
                                <p>{t('dbSymptoms')}: {diagnosis.symptoms}</p>
                                <p>{t('dbIncubationPeriod')}: {diagnosis.incubationPeriod}</p>
                                <p>{t('dbTreatment')}: {diagnosis.treatment}</p>
                                <p>{t('dbPrevention')}: {diagnosis.prevention}</p>
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
        let t = this.props.t;

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
                                <p>{t('dbName')}: {operation.name}</p>
                                <p>{t('dbPrice')}: {operation.price}</p>
                                <p>{t('dbType')}: {operation.type}</p>
                                <p>{t('dbDescription')}: {operation.description}</p>
                                <p>{t('dbLength')}: {operation.length}</p>
                                <p>{t('dbNote')}: {operation.note}</p>
                                <p>{t('dbAnimals')}: {operation.targetAnimals}</p>
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