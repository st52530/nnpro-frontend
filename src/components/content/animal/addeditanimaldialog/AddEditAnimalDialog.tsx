import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import Clinic from "../../../../entities/Clinic";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Animal from "../../../../entities/Animal";


export default class AddEditAnimalDialog extends AddEditDialog<Animal> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("apEdit")
        }
        return i18n.t("apAdd")
    }

    protected validate(): string | undefined {
        let {name} = this.state.item
        if (!name || name.trim().length === 0) {
            return i18n.t("dfEmptyName");
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

    protected renderForm(): React.ReactNode {
        let {name} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfClinicName")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeName} value={name || ""} placeholder={i18n.t("dfClinicName")}/>
                    </Col>
                </Form.Group>

            </Form>
        );
    }
}