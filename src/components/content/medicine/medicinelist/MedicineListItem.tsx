import React, {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./MedicineListItem.css"
import Medicine from "../../../../entities/Medicine";

interface Props {
    medicine : Medicine
}

const MedicineListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let medicine : Medicine = props.medicine;

    const URL = RouterConstants.medicineDetails.replace(":id", String(medicine.idMedicine))
    return (
        <NavLink to={URL} className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{medicine.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{medicine.code}</h6>
                </div>
            </div>
        </NavLink>
    )
}

export default MedicineListItem;
