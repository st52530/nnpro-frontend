import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Combobox from "../../../common/combobox/Combobox";
import DataStorage from "../../../../services/DataStorage";
import ClinicConsumable from "../../../../entities/ClinicConsumable";
import Consumable, {getConsumableId, getConsumableLabel} from "../../../../entities/Consumable";


export default class AddEdicClinicConsumable extends AddEditDialog<ClinicConsumable> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpConsumable")
        }
        return i18n.t("cpConsumable")
    }

    protected isMedicineNew = () : boolean => {
        return this.state.item.idClinicConsumable === undefined
    }

    protected validate(): string | undefined {
        let {quantityInStock , consumable} = this.state.item
        if (!quantityInStock || quantityInStock < 0) {
            return i18n.t("cpQuantityNotChosen")
        }
        if (this.isMedicineNew() && !consumable) {
            return i18n.t("cpConsumableNotChosen")
        }

        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeConsumable = (consumable : Consumable) : void => {
        this.setState({ item : {
                ...this.state.item,
                consumable : consumable,
            }})
    }

    private onChangeCount = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                quantityInStock : Number(e.target.value)
            }})
    }

    protected renderForm(): React.ReactNode {
        let {consumable , quantityInStock} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("cpConsumable")}
                    </Form.Label>
                    <Col sm="10">
                        <Combobox items={DataStorage.consumablesStorage}
                                  getID={getConsumableId}
                                  getLabel={getConsumableLabel}
                                  onSelect={this.onChangeConsumable}
                                  selected={consumable}/>
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