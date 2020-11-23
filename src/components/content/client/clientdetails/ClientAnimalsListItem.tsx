import {FC, PropsWithChildren} from "react";
import Animal from "../../../../entities/Animal";
import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import i18n from "../../../../i18n";

interface Props {
    animals : Animal
    onAdd: (animal : Animal) => void;
}

const ClientAnimalListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let animal : Animal = props.animals;

    return (
        <div className="card consumable-card my-1">
            <div className="card-body py-2">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">{animal.name}</h5>
                    </div>
                    <div className="col-6 text-right">
                        <ButtonGroup>
                            <Button variant="primary" onClick={event => {props.onAdd(animal)}}>Přidejte návštěvu</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientAnimalListItem;
