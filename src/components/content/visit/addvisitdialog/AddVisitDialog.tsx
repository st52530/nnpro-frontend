import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Report from "../../../../entities/Report";
import Combobox from "../../../common/combobox/Combobox";
import DataStorage from "../../../../services/DataStorage";
import Staff, {getStaffId, getStaffLabel} from "../../../../entities/Staff";
import {UserRole} from "../../../../entities/User";


export default class AddVisitDialog extends AddEditDialog<Report> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("cpEdit")
        }
        return i18n.t("vpAdd")
    }

    protected validate(): string | undefined {
        let {textDescription, veterinary} = this.state.item
        if (!textDescription || textDescription.trim().length === 0) {
            return i18n.t("dfEmpty");
        }
        if (!veterinary) {
            return i18n.t("dfEmpty");
        }
        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeTextDescription = (e : any) : void => {
        this.setState({ item : {
                ...this.state.item,
                textDescription : e.target.value,
            }})
    }

    private onChangeStaff = (staff : Staff) : void => {
        let veterinary = {} as Staff
        veterinary.idUser = staff.idUser
        this.setState({ item : {
                ...this.state.item,
                veterinary : veterinary,
            }})
    }



    protected renderForm(): React.ReactNode {
        let {textDescription} = this.state.item
        let staff = DataStorage.staffStorage;
        let staffForSelect = staff.filter(s => s.role === UserRole.VETERINARY || s.roles === UserRole.VETERINARY);
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="3">
                        {i18n.t("dfVisitTextDescription")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={this.props.item?.animal?.name || ""} disabled={true}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="3">
                        {i18n.t("dfVisitVeterinary")}
                    </Form.Label>
                    <Col sm="9">
                        <Combobox items={staffForSelect} getID={getStaffId} getLabel={getStaffLabel} onSelect={this.onChangeStaff}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="3">
                        {i18n.t("dfVisitTextDescription")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" onChange={this.onChangeTextDescription} value={textDescription || ""} placeholder={i18n.t("dfVisitTextRecommendation")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}