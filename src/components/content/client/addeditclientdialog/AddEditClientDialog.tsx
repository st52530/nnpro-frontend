import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import Clinic from "../../../../entities/Clinic";
import React from "react";
import {Col, Row, Form} from "react-bootstrap";
import User from "../../../../entities/User";


export default class AddEditClientDialog extends AddEditDialog<User> {

    getHeader(): string {
        if (this.props.item) {
            return "Edit client"
        }
        return "Add new client"
    }

    protected validate(): string | undefined {
        let {username , fullName, email, password} = this.state.item
        if (!username || username.trim().length === 0) {
            return "User name is empty";
        }
        if (!fullName || fullName.trim().length === 0) {
            return "User full name is empty";
        }
        if (!email || email.trim().length === 0) {
            return "Email is empty";
        }
        if (this.props.item || !password || password.trim().length === 0) {
            return "Password is empty";
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

    private onChangePassword = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                password : e.target.value,
            }})
    }

    protected renderForm(): React.ReactNode {
        let {username , fullName, email, password} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Full name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeFullName} value={fullName || ""} placeholder="Full name"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeUserName} value={username || ""} placeholder="Username"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeEmail} value={email || ""} placeholder="User email"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" onChange={this.onChangePassword} value={password || ""} placeholder="Password"/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}