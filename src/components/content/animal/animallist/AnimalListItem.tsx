import {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./AnimalListItem.css"
import Animal from "../../../../entities/Animal";
import React from "react";

interface Props {
    animal : Animal
}

const ClinicListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let animal : Animal = props.animal;

    const URL = RouterConstants.clinicDetails.replace(":id", String(animal.idAnimal))
    return (
        <div className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{animal.name}</h5>
                </div>
            </div>
        </div>
    )
}

export default ClinicListItem;
