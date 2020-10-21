import {FC, PropsWithChildren} from "react";
import {Department} from "../../../services/DepartmentService";
import React from "react";
import {RouterConstants} from "../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./DepartmentsListItem.css"

interface Props {
    department : Department
}

const DepartmentListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let department : Department = props.department;

    const URL = RouterConstants.departmentInfo.replace(":id", String(department.id))
    return (
        <NavLink to={URL} className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{department.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{department.address}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">+{department.phone}</h6>
                    <p className="card-text">{department.details}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default DepartmentListItem;
