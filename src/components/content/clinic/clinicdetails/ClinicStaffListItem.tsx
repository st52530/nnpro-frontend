import React from "react";
import { FC, PropsWithChildren } from "react";
import {Button, ButtonGroup, Col} from "react-bootstrap";
import i18n from "../../../../i18n";

import Staff from "../../../../entities/Staff";
import Securable from "../../../common/secureable/Securable";
import {getRoleLabel, UserRole} from "../../../../entities/User";

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
                        <h5 className="card-title">{staff.fullName}</h5>
                        <h6 className="card-title">{staff.email}</h6>
                        <h6 className="card-title">{getRoleLabel(staff.roles)}</h6>
                    </div>
                    <div className="col-4 text-right">
                        <Securable access={[UserRole.ADMINISTRATOR]}>
                            <ButtonGroup>
                                <Button variant="primary" onClick={event => {props.onEdit(staff)}}>{i18n.t("update")}</Button>
                                <Button variant="danger" onClick={event => {props.onDelete(staff)}}>{i18n.t("delete")}</Button>
                            </ButtonGroup>
                        </Securable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClinicStaffListItem;
