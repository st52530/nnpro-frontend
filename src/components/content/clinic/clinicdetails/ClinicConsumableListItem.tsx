import React from "react";
import {FC, PropsWithChildren} from "react";

import ClinicConsumable from "../../../../entities/ClinicConsumable";
import ClinicMedicine from "../../../../entities/ClinicMedicine";
import Securable from "../../../common/secureable/Securable";
import {UserRole} from "../../../../entities/User";
import {Button, ButtonGroup} from "react-bootstrap";
import i18n from "../../../../i18n";

interface Props {
    clinicConsumable : ClinicConsumable
    onEdit: (clinicConsumable: ClinicConsumable) => void;
    onDelete: (clinicConsumable: ClinicConsumable) => void;
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
                        {i18n.t("clinicConsumableId")} {clinicConsumable.idClinicConsumable}
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <p className="m-0 mr-4">{clinicConsumable.consumable.price} Kč</p>
                            <Securable access={[UserRole.ADMINISTRATOR]}>
                                <ButtonGroup>
                                    <Button variant="primary" onClick={event => {props.onEdit(clinicConsumable)}}>{i18n.t("update")}</Button>
                                    <Button variant="danger" onClick={event => {props.onDelete(clinicConsumable)}}>{i18n.t("delete")}</Button>
                                </ButtonGroup>
                            </Securable>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ClinicConsumableListItem;
