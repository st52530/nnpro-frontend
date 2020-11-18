import {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Animal from "../../../../entities/Animal";
import React from "react";
import i18n from "../../../../i18n";

interface Props {
    animal : Animal
}

const ClinicListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let animal : Animal = props.animal;

    const URL = RouterConstants.clinicDetails.replace(":id", String(animal.idAnimal))
    return (
        <div>
            <div className="card-link mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{animal.name}</h5>
                        <h6 className="card-title">{i18n.t("apOwner")} {animal.owner?.fullName}</h6>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ClinicListItem;
