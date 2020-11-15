import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Medicine from "../../../../entities/Medicine";
import Datetime from 'react-datetime';
import moment, {Moment} from "moment";


export default class AddEditMedicineDialog extends AddEditDialog<Medicine> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("cpAdd")
    }

    protected validate(): string | undefined {
        let {name , code , substances, targetAnimals, form, dateOfApproval, numberOfApproval, approvalHolder, protectionPeriod, type, packageSize} = this.state.item
        if (!name || name.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!code || code.trim().length === 0) {
            return i18n.t("dfEmptyCode");
        }
        if (!substances || substances.trim().length === 0) {
            return i18n.t("dfEmptySubstances");
        }
        if (!targetAnimals || targetAnimals.trim().length === 0) {
            return i18n.t("dfEmptyTargetAnimals");
        }
        if (!form || form.trim().length === 0) {
            return i18n.t("dfEmptyForm");
        }
        if (!dateOfApproval) {
            return i18n.t("dfEmptyDateOfApproval");
        }
        if (!numberOfApproval || numberOfApproval.trim().length === 0) {
            return i18n.t("dfEmptyNumberOfApproval");
        }
        if (!approvalHolder || approvalHolder.trim().length === 0) {
            return i18n.t("dfEmptyApprovalHolder");
        }
        if (!protectionPeriod || protectionPeriod.trim().length === 0) {
            return i18n.t("dfEmptyProtectionPeriod");
        }
        if (!type || type.trim().length === 0) {
            return i18n.t("dfEmptyType");
        }
        if (!packageSize || packageSize.trim().length === 0) {
            return i18n.t("dfEmptyPackageSize");
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
                code : e.target.value
            }})
    }

    private onChangeSubstances = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                substances : e.target.value
            }})
    }


    private onChangeTargetAnimals = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                targetAnimals : e.target.value
            }})
    }

    private onChangeForm = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                form : e.target.value
            }})
    }

    private onChangeDateOfApproval = (date: Moment | string): void => {
        if (moment.isMoment(date)) {
            this.setState({
                item: {
                    ...this.state.item,
                    dateOfApproval: date.toDate(),
                }
            })
        }
    }

    private onChangeNumberOfApproval = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                numberOfApproval : e.target.value
            }})
    }


    private onChangeApprovalHolder = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                approvalHolder : e.target.value
            }})
    }

    private onChangeProtectionPeriod = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                protectionPeriod : e.target.value
            }})
    }

    private onChangeType = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                type : e.target.value
            }})
    }

    private onChangePackageSize = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                packageSize : e.target.value
            }})
    }

    protected renderForm(): React.ReactNode {
        let {name , code , substances, targetAnimals, form, dateOfApproval, numberOfApproval, approvalHolder, protectionPeriod, type, packageSize} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineName")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeName} value={name || ""} placeholder={i18n.t("dfMedicineName")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineCode")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeCode} value={code || ""} placeholder={i18n.t("dfMedicineCode")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineSubstances")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeSubstances} value={substances || ""} placeholder={i18n.t("dfMedicineSubstances")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineTargetAnimals")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeTargetAnimals} value={targetAnimals || ""} placeholder={i18n.t("dfMedicineTargetAnimals")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineForm")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeForm} value={form || ""} placeholder={i18n.t("dfMedicineForm")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineNumberOfApproval")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeNumberOfApproval} value={numberOfApproval || ""} placeholder={i18n.t("dfMedicineNumberOfApproval")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineDateOfApproval")}
                    </Form.Label>
                    <Col sm="10">
                        <Datetime onChange={this.onChangeDateOfApproval} closeOnSelect={true} timeConstraints={{ minutes : { min: 0, max: 59, step : 30 }}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineApprovalHolder")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeApprovalHolder} value={approvalHolder || ""} placeholder={i18n.t("dfMedicineApprovalHolder")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineProtectionPeriod")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeProtectionPeriod} value={protectionPeriod || ""} placeholder={i18n.t("dfMedicineProtectionPeriod")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicineType")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeType} value={type || ""} placeholder={i18n.t("dfMedicineType")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfMedicinePackageSize")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangePackageSize} value={packageSize || ""} placeholder={i18n.t("dfMedicinePackageSize")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}