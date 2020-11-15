import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Staff from "../../../../entities/Staff";


export default class AddEditStaffDialog extends AddEditDialog<Staff> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("spEdit");
        }
        return i18n.t("spAdd");
    }

    protected validate(): string | undefined {
        let {username , fullName, password} = this.state.item
        if (!username || username.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!fullName || fullName.trim().length === 0) {
            return i18n.t("dfEmptyFullName");
        }
        if (!password || password.trim().length === 0) {
            return i18n.t("dfEmptyPassword");
        }


        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeUsername = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                username : e.target.value,
            }})
    }

    private onChangeFullName = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                fullName : e.target.value
            }})
    }

    private onChangePassword = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                password : e.target.value
            }})
    }

    protected renderForm(): React.ReactNode {
        let {username , fullName, password} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfStaffUsername")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeUsername} value={username || ""} placeholder={i18n.t("dfStaffUsername")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfFullName")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangeFullName} value={fullName || ""} placeholder={i18n.t("dfFullName")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfPassword")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" onChange={this.onChangePassword} value={password || ""} placeholder={i18n.t("dfPassword")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}