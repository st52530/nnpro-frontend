import React, {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./StaffListItem.css"
import Staff from "../../../../entities/Staff";

interface Props {
    staff : Staff
}

const StaffListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let staff : Staff = props.staff;

    const URL = RouterConstants.staffDetails.replace(":id", String(staff.idStaff))
    return (
        <NavLink to={URL} className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{staff.fullName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{staff.username}</h6>
                </div>
            </div>
        </NavLink>
)
}

export default StaffListItem;
