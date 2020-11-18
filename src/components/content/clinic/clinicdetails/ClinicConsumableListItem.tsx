import React from "react";
import {FC, PropsWithChildren} from "react";

import ClinicConsumable from "../../../../entities/ClinicConsumable";

interface Props {
    clinicConsumable : ClinicConsumable
}

const ClinicConsumableListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let clinicConsumable : ClinicConsumable = props.clinicConsumable;

    return (
        <div className="card consumable-card my-1">
            <div className="card-body py-2">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">{clinicConsumable.consumable.name}</h5>
                        <p className="m-0">{clinicConsumable.consumable.code}</p>
                        <p className="m-0">{clinicConsumable.quantityInStock} ks</p>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <p className="m-0">{clinicConsumable.consumable.price} Kč</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClinicConsumableListItem;
