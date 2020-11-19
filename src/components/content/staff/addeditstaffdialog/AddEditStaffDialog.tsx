import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Staff from "../../../../entities/Staff";
import DataStorage from "../../../../services/DataStorage";
import Combobox from "../../../common/combobox/Combobox";
import User, {getRoleId, getRoleLabel, UserRole} from "../../../../entities/User";


export default class AddEditStaffDialog extends AddEditDialog<Staff> {

    /* 
    componentDidMount() {
        if (DataStorage.currentClinic) {
            this.setState({
                item: {
                ...this.state.item,
                clinic: DataStorage.currentClinic,
                }})
        }
    }*/

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("spEdit");
        }
        return i18n.t("spAdd");
    }

    protected validate(): string | undefined {
        let {email, username , fullName, password, roles, role} = this.state.item
        if (!role || !roles){
            return "FIX";
        }
        if (!email || email.trim().length === 0) {
            return i18n.t("dfEmptyEmail");
        }
        if (!username || username.trim().length === 0) {
            return i18n.t("dfEmptyName");
        }
        if (!fullName || fullName.trim().length === 0) {
            return i18n.t("dfEmptyFullName");
        }
        if (this.isNew()){
            if (!password || password.trim().length === 0 ) {
                return i18n.t("dfEmptyPassword");
            }
        }

        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeEmail = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                email : e.target.value
            }})
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


    private onRoleSelect = (role : UserRole) : void => {
        this.setState({ item : {
            ...this.state.item,
            roles : role,
                role : role
        }})
    }

    protected renderForm(): React.ReactNode {
        let {email, username , fullName, password, roles} = this.state.item
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfStaffRole")}
                    </Form.Label>
                    <Col sm="10">
                        <Combobox items={Object.values(UserRole)} getID={getRoleId} getLabel={getRoleLabel} onSelect={this.onRoleSelect} selected={roles}/>
                    </Col>
                </Form.Group>

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
                        {i18n.t("dfEmail")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" onChange={this.onChangeEmail} value={email || ""} placeholder={i18n.t("dfEmail")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        {i18n.t("dfPassword")}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" onChange={this.onChangePassword} value={password || ""} placeholder={i18n.t("dfPassword")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}