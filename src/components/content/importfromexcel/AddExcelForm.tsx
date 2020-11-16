import AddEditDialog from "../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../i18n";


export default class AddExcelForm extends AddEditDialog<Blob> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("cpAdd")
    }

    protected validate(): string | undefined {
        /*let {name , address} = this.state.item
        if (!name || name.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!address || address.trim().length === 0) {
            return i18n.t("dfEmptyAddress");
        }
        */
        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    protected renderForm(): React.ReactNode {
        //let {name , address} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Choose file
                    </Form.Label>
                    <Col sm="10">
                        <Form.File/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}