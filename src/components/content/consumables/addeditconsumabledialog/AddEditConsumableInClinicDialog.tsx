import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import ClinicConsumable from "../../../../entities/ClinicConsumable";
import Combobox from "../../../common/combobox/Combobox";
import DataStorage from "../../../../services/DataStorage";
import Consumable, { getConsumableId, getConsumableLabel } from "../../../../entities/Consumable";


export default class AddEditConsumableInClinicDialog extends AddEditDialog<ClinicConsumable> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("cpAdd")
    }

    protected validate(): string | undefined {
        let {quantityInStock} = this.state.item
        if (!quantityInStock || quantityInStock < 0) {
            return i18n.t("dfEmptyQuantityInStock");
        }

        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeQuantityInStock = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                quantityInStock : e.target.value,
            }})
    }

    private onChangeConsumable = (consumable : Consumable): void => {
        this.setState({
            item: {
                ...this.state.item,
                consumable: consumable
            }
        })
    }

    protected renderForm(): React.ReactNode {
        let {quantityInStock} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumableQuantityInStock")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeQuantityInStock} value={quantityInStock || ""} placeholder={i18n.t("dfConsumableQuantityInStock")}/>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfConsumable")}
                    </Form.Label>
                    <Col sm="10">
                    </Col>
                </Form.Group>

            </Form>
        );
    }
}
/*

                        <Combobox items={DataStorage.consumablesStorage} onSelect={this.onChangeConsumable} getLabel={getConsumableLabel}
                                        getID={getConsumableId}/>
*/