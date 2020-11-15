import {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./ClinicStaffListItem.css"
import Staff from "../../../../entities/Staff";
import React from "react";

interface Props {
    staff : Staff
}

const ClinicStaffListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let staff : Staff = props.staff;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{staff.username}</h5>
            </div>
        </div>
    )
}

export default ClinicStaffListItem;
