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

    const URL = RouterConstants.staffDetails.replace(":id", String(staff.idUser))
    return (
        <div className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{staff.fullName}</h5>
                </div>
            </div>
        </div>
)
}

export default StaffListItem;
