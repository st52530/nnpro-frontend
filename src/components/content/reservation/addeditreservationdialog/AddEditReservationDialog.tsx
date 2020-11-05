import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Reservation from "../../../../entities/Reservation";


export default class AddEditReservationDialog extends AddEditDialog<Reservation> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("rpEdit")
        }
        return i18n.t("rpAdd")
    }

    protected validate(): string | undefined {
        let date = this.state.item
        if (!date) {
            return i18n.t("dfDate");
        }

        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeDate = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                date : e.target.value,
            }})
    }

    protected renderForm(): React.ReactNode {
        let date = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfDate")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" onChange={this.onChangeDate} value={String(date) || ""} placeholder={i18n.t("dfDate")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}