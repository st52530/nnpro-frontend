import {FC, PropsWithChildren} from "react";
import Consumable from "../../../../entities/Consumable";
import "./ClinicConsumableListItem.css"
import React from "react";

interface Props {
    consumable : Consumable
}

const ClinicConsumableListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let consumable : Consumable = props.consumable;

    return (
        <div className="card consumable-card my-1">
            <div className="card-body py-2">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">{consumable.name}</h5>
                        <p className="m-0">{consumable.code}</p>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <p className="m-0">{consumable.price} Kč</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClinicConsumableListItem;
