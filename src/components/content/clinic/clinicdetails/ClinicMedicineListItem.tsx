import {FC, PropsWithChildren} from "react";
import Medicine from "../../../../entities/Medicine";
import "./ClinicMedicineListItem.css"
import React from "react";

interface Props {
    medicine : Medicine
}

const ClinicMedicineListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let medicine : Medicine = props.medicine;

    return (
        <div className="card medicine-card my-1">
            <div className="card-body py-2">
                <h5 className="card-title">{medicine.name}</h5>
                <p className="m-0">{medicine.code}</p>
            </div>
        </div>
    )
}

export default ClinicMedicineListItem;
