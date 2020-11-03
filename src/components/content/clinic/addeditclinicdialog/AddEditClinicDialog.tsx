import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import Clinic from "../../../../entities/Clinic";
import React from "react";
import {Col, Row, Form} from "react-bootstrap";
import i18n from "../../../../i18n";


export default class AddEditClinicDialog extends AddEditDialog<Clinic> {

    getHeader(): string {
        if (this.props.item) {
            return "Edit clinic"
        }
        return "Add new clinic"
    }

    protected validate(): string | undefined {
        let {name , address} = this.state.item
        if (!name || name.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!address || address.trim().length === 0) {
            return i18n.t("dfEmptyAddress");
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

    private onChangeAddress = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                address : e.target.value
            }})
    }

    protected renderForm(): React.ReactNode {
        let {name , address} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeName} value={name || ""} placeholder={i18n.t("dfClinicName")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeAddress} value={address || ""} placeholder={i18n.t("dfAddress")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}