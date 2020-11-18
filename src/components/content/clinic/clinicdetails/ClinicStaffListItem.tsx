import React from "react";
import { FC, PropsWithChildren } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import i18n from "../../../../i18n";

import Staff from "../../../../entities/Staff";

interface Props {
    staff : Staff
    onDelete : (staff : Staff) => void;
    onEdit : (staff : Staff) => void;
}

const ClinicStaffListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let staff : Staff = props.staff;
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <h5 className="card-title">{staff.username}</h5>
                        <h6 className="card-title">{staff.fullName}</h6>
                        <h6 className="card-title">{staff.email}</h6>
                    </div>
                    <div className="col-4 text-right">
                        <ButtonGroup>
                            <Button variant="primary" onClick={event => {props.onEdit(staff)}}>{i18n.t("update")}</Button>
                            <Button variant="danger" onClick={event => {props.onDelete(staff)}}>{i18n.t("delete")}</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClinicStaffListItem;
