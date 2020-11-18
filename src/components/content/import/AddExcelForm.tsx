import AddEditDialog from "../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../i18n";


export default class AddExcelForm extends AddEditDialog<Blob> {

    getHeader(): string {
        return i18n.t("import")
    }

    protected validate(): string | undefined {
        return undefined;
    }

    onChangeFile = (e : any) => {
        this.setState({item : e.target.files[0]})
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    protected renderForm(): React.ReactNode {
        return (
            <Form>
                <div className="file-field">
                    <Form.Label>
                        Choose file
                    </Form.Label>
                    <div className="file-path-wrapper">
                        <Form.File className="btn btn-success btn-sm float-left w-100" onChange={this.onChangeFile}/>
                    </div>
                </div>
            </Form>
        );
    }
}