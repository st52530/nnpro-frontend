import {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./ClinicListItem.css"
import Clinic from "../../../../entities/Clinic";
import React from "react";

interface Props {
    clinic : Clinic
}

const ClinicListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let clinic : Clinic = props.clinic;

    const URL = RouterConstants.departmentInfo.replace(":id", String(clinic.idClinic))
    return (
        <NavLink to={URL} className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{clinic.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{clinic.address}</h6>
                </div>
            </div>
        </NavLink>
    )
}

export default ClinicListItem;
