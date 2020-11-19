import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import ClinicMedicine from "../../../../entities/ClinicMedicine";
import Medicine, {getMedicineId, getMedicineLabel} from "../../../../entities/Medicine";
import Combobox from "../../../common/combobox/Combobox";
import DataStorage from "../../../../services/DataStorage";


export default class AddEditClinicMedicine extends AddEditDialog<ClinicMedicine> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpMedicine")
        }
        return i18n.t("cpMedicine")
    }

    protected isMedicineNew = () : boolean => {
        return this.state.item.idClinicMedicine === undefined
    }

    protected validate(): string | undefined {
        let {quantityInStock , medicine} = this.state.item
        if (!quantityInStock || quantityInStock < 0) {
            return i18n.t("cpQuantityNotChosen")
        }
        if (this.isMedicineNew() && !medicine) {
            return i18n.t("cpMedicineNotChosen")
        }

        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeMedicine = (medicine : Medicine) : void => {
        this.setState({ item : {
                ...this.state.item,
                medicine : medicine,
            }})
    }

    private onChangeCount = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                quantityInStock : Number(e.target.value)
            }})
    }

    protected renderForm(): React.ReactNode {
        let {medicine , quantityInStock} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("cpMedicine")}
                    </Form.Label>
                    <Col sm="10">
                        <Combobox items={DataStorage.medicineStorage}
                                  getID={getMedicineId}
                                  getLabel={getMedicineLabel}
                                  onSelect={this.onChangeMedicine}
                                  selected={medicine}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("cpQuantity")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" onChange={this.onChangeCount} value={quantityInStock || ""} placeholder={i18n.t("cpQuantity")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}