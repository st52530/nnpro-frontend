import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Medicine from "../../../../entities/Medicine";


export default class AddEditMedicineDialog extends AddEditDialog<Medicine> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("cpAdd")
    }

    protected validate(): string | undefined {
        let {name , code} = this.state.item
        if (!name || name.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!code || code.trim().length === 0) {
            return i18n.t("dfEmptyCode");
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

    protected renderForm(): React.ReactNode {
        let {name , code} = this.state.item
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
            </Form>
        );
    }
}