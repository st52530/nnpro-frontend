import React, {FC, PropsWithChildren} from "react";
import Animal from "../../../../entities/Animal";
import {Button, ButtonGroup} from "react-bootstrap";
import DataStorage from "../../../../services/DataStorage";
import {UserRole} from "../../../../entities/User";
import Securable from "../../../common/secureable/Securable";

interface Props {
    animals : Animal
    onAdd: (animal : Animal) => void;
}

const ClientAnimalListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let animal : Animal = props.animals;
    let currentRole = DataStorage.currentUser?.roles;
    return (

        <div className="card consumable-card my-1">
            <div className="card-body py-2">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">{animal.name}</h5>
                    </div>
                    <div className="col-6 text-right">
                        <Securable access={[UserRole.VETERINARY_TECHNICIAN, UserRole.ADMINISTRATOR]}>
                            <ButtonGroup>
                                <Button variant="primary" onClick={event => {props.onAdd(animal)}}>Přidejte návštěvu</Button>
                            </ButtonGroup>
                        </Securable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientAnimalListItem;
