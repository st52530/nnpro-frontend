import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Consumable from "../../../../entities/Consumable";
import Datetime from 'react-datetime';
import moment, {Moment} from "moment";


export default class AddEditConsumableDialog extends AddEditDialog<Consumable> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("cpAdd")
    }

    protected validate(): string | undefined {
        let {name, code, price, nameAddition, groupType, prescriptionDesignation, unitOfMeasure, producer, countryOfOrigin, dateOfExpiration, dateOfChange} = this.state.item
        if (!name || name.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!code || code.trim().length === 0) {
            return i18n.t("dfEmptyCode");
        }
        if (!price || price < 0) {
            return i18n.t("dfEmptyPrice");
        }
        if (!nameAddition || nameAddition.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!groupType || groupType.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!prescriptionDesignation || prescriptionDesignation.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!unitOfMeasure || unitOfMeasure.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!producer || producer.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!countryOfOrigin || countryOfOrigin.trim().length === 0) {
            return i18n.t("dfEmpty");
        }

        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeName = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                name : e.target.value,
            }})
    }

    private onChangeCode = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                code : e.target.value,
            }})
    }

    private onChangeNameAddition = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                nameAddition : e.target.value,
            }})
    }

    private onChangeGroupType = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                groupType : e.target.value,
            }})
    }

    private onChangePrescriptionDesignation = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                prescriptionDesignation : e.target.value,
            }})
    }

    private onChangeUnitOfMeasure = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                unitOfMeasure : e.target.value,
            }})
    }

    private onChangeProducer = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                producer : e.target.value,
            }})
    }

    private onChangeCountryOfOrigin = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                countryOfOrigin : e.target.value,
            }})
    }

    private onChangeDateOfExpiration = (date: Moment | string): void => {
        if (moment.isMoment(date)) {
            this.setState({
                item: {
                    ...this.state.item,
                    dateOfExpiration: date.toDate(),
                }
            })
        }
    }

    private onChangeDateOfChange = (date: Moment | string): void => {
        if (moment.isMoment(date)) {
            this.setState({
                item: {
                    ...this.state.item,
                    dateOfChange: date.toDate(),
                }
            })
        }
    }

    protected renderForm(): React.ReactNode {
        let {name, code, price, nameAddition, groupType, prescriptionDesignation, unitOfMeasure, producer, countryOfOrigin, dateOfExpiration, dateOfChange} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableName")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeName} value={name || ""} placeholder={i18n.t("dfConsumableName")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableCode")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeCode} value={code || ""} placeholder={i18n.t("dfConsumableCode")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableNameAddition")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeNameAddition} value={nameAddition || ""} placeholder={i18n.t("dfConsumableNameAddition")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableGroupType")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeGroupType} value={groupType || ""} placeholder={i18n.t("dfConsumableGroupType")}/>
                    </Col>
                </Form.Group>                
                
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumablePrescriptionDesignation")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangePrescriptionDesignation} value={prescriptionDesignation || ""} placeholder={i18n.t("dfConsumablePrescriptionDesignation")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableUnitOfMeasure")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeUnitOfMeasure} value={unitOfMeasure || ""} placeholder={i18n.t("dfConsumableUnitOfMeasure")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableProducer")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeProducer} value={producer || ""} placeholder={i18n.t("dfConsumableProducer")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableCountryOfOrigin")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeCountryOfOrigin} value={countryOfOrigin || ""} placeholder={i18n.t("dfConsumableCountryOfOrigin")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableDateOfExpiration")}
                    </Form.Label>
                    <Col sm="10">
                        <Datetime onChange={this.onChangeDateOfExpiration} closeOnSelect={true} timeConstraints={{ minutes : { min: 0, max: 59, step : 30 }}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableDateOfChange")}
                    </Form.Label>
                    <Col sm="10">
                        <Datetime onChange={this.onChangeDateOfChange} closeOnSelect={true} timeConstraints={{ minutes : { min: 0, max: 59, step : 30 }}}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}