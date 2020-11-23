import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Report from "../../../../entities/Report";
import Combobox from "../../../common/combobox/Combobox";
import DataStorage from "../../../../services/DataStorage";
import Staff, {getStaffId, getStaffLabel} from "../../../../entities/Staff";
import {UserRole} from "../../../../entities/User";
import {getMedicineId, getMedicineLabel} from "../../../../entities/Medicine";
import MultiSelect from "../../../common/multiselect/MultiSelect";
import {getConsumableId, getConsumableLabel} from "../../../../entities/Consumable";


export default class FinishVisitDialog extends AddEditDialog<Report> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("vpAdd")
    }

    protected validate(): string | undefined {
        let {textDiagnosis, diagnosis} = this.state.item
        if (!textDiagnosis || textDiagnosis.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!diagnosis) {
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

    private onChangeDiagnoseDescription = (e : any) => {
        this.setState({ item : {
                ...this.state.item,
                textDiagnosis : e.target.value,
            }})
    }

    private onChangeDiagnoseRecommendation = (e : any) => {
        this.setState({ item : {
                ...this.state.item,
                textRecommendation : e.target.value,
            }})
    }

    private onChangeDiagnosis = () => {

    }

    private onChangeOperation = () => {

    }


    protected renderForm(): React.ReactNode {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfVisitTextDescription")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={this.props.item?.animal?.name || ""} disabled={true}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfVisitVeterinary")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={this.props.item?.veterinary?.fullName || ""}
                                      disabled={true}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfVisitTextDescription")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" value={this.props.item?.textDescription || ""} disabled={true}/>
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfDiagnosesDescription")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" value={this.props.item?.textDiagnosis || ""}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfDiagnosesDescription")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" value={this.props.item?.textRecommendation || ""}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfMedicines")}
                    </Form.Label>
                    <Col sm="9">
                        <MultiSelect items={DataStorage.medicineStorage} getLabel={getMedicineLabel}
                                     getID={getMedicineId}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        {i18n.t("dfConsumables")}
                    </Form.Label>
                    <Col sm="9">
                        <MultiSelect items={DataStorage.consumablesStorage} getLabel={getConsumableLabel}
                                     getID={getConsumableId}/>
                    </Col>
                </Form.Group>

            </Form>
        );
    }
}