import {FC, PropsWithChildren} from "react";
import ClinicMedicine from "../../../../entities/ClinicMedicine";
import React from "react";

interface Props {
    clinicMedicine : ClinicMedicine
}

const ClinicMedicineListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let clinicMedicine : ClinicMedicine = props.clinicMedicine;

    return (
        <div className="card medicine-card my-1">
            <div className="card-body py-2">
                <h5 className="card-title">{clinicMedicine.medicine.name}</h5>
                <p className="m-0">{clinicMedicine.medicine.code}</p>
            </div>
        </div>
    )
}

export default ClinicMedicineListItem;
