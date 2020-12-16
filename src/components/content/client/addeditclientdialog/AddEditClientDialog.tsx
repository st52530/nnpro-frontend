import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import User from "../../../../entities/User";
import i18n from "../../../../i18n";


export default class AddEditClientDialog extends AddEditDialog<User> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("dfEditClient")
        }
        return i18n.t("dfAddClient")
    }

    protected validate(): string | undefined {
        let {username , fullName, email, password, address, phoneNumber} = this.state.item
        if (!this.props.item && (!username || username.trim().length === 0)) {
            return i18n.t("dfEmptyName");
        }
        if (!fullName || fullName.trim().length === 0) {
            return i18n.t("dfEmptyFullName");
        }
        if (!email || email.trim().length === 0) {
            return i18n.t("dfEmptyMail");
        }
        if (!address || address.trim().length === 0) {
            return i18n.t("dfEmptyAddress");
        }
        if (!phoneNumber || phoneNumber.trim().length === 0) {
            return i18n.t("dfEmptyPhoneNumber");
        }
        if (!this.props.item && (!password || password.trim().length === 0)) {
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

    private onChangeFullName = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                fullName : e.target.value,
            }})
    }

    private onChangeUserName = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                username : e.target.value,
            }})
    }

    private onChangeEmail = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                email : e.target.value,
            }})
    }

    private onChangePhoneNumber = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                phoneNumber : e.target.value,
            }})
    }

    private onChangeAddress = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                address : e.target.value,
            }})
    }

    private onChangePassword = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                password : e.target.value,
            }})
    }

    protected renderForm(): React.ReactNode {
        let {username , fullName, email, password, phoneNumber, address} = this.state.item
        if(this.props.item){
            return (

                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfFullName")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeFullName} value={fullName || ""}
                                          placeholder={i18n.t("dfFullName")}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfEmail")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeEmail} value={email || ""}
                                          placeholder={i18n.t("dfEmail")}/>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfPhoneNumber")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangePhoneNumber} value={phoneNumber || ""}
                                          placeholder={i18n.t("dfPhoneNumber")}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfAddress")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeAddress} value={address || ""}
                                          placeholder={i18n.t("dfAddress")}/>
                        </Col>
                    </Form.Group>
                </Form>
            );
        }
        else
        {
            return (

                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfFullName")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeFullName} value={fullName || ""}
                                          placeholder={i18n.t("dfFullName")}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfName")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeUserName} value={username || ""}
                                          placeholder={i18n.t("dfName")}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfEmail")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeEmail} value={email || ""}
                                          placeholder={i18n.t("dfEmail")}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfPhoneNumber")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangePhoneNumber} value={phoneNumber || ""}
                                          placeholder={i18n.t("dfPhoneNumber")}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfAddress")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" onChange={this.onChangeAddress} value={address || ""}
                                          placeholder={i18n.t("dfAddress")}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfPassword")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" onChange={this.onChangePassword} value={password || ""}
                                          placeholder={i18n.t("dfPassword")}/>
                        </Col>
                    </Form.Group>
                </Form>
            );
        }
    }
}