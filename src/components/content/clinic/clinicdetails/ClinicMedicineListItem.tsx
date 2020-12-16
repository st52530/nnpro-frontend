import {FC, PropsWithChildren} from "react";
import ClinicMedicine from "../../../../entities/ClinicMedicine";
import React from "react";
import Securable from "../../../common/secureable/Securable";
import {UserRole} from "../../../../entities/User";
import {Button, ButtonGroup} from "react-bootstrap";
import i18n from "../../../../i18n";

interface Props {
    clinicMedicine: ClinicMedicine
    onEdit: (clinicmedicine: ClinicMedicine) => void;
    onDelete: (clinicmedicine: ClinicMedicine) => void;
}

const ClinicMedicineListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let clinicMedicine : ClinicMedicine = props.clinicMedicine;

    return (
        <div className="card consumable-card my-1">
            <div className="card-body py-2">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">{clinicMedicine.medicine.name}</h5>
                        <p className="m-0">{clinicMedicine.medicine.code}</p>
                        <p className="m-0">{clinicMedicine.quantityInStock} ks</p>

                        idClinicMedicine {clinicMedicine.idClinicMedicine}
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <Securable access={[UserRole.ADMINISTRATOR]}>
                            <ButtonGroup>
                                <Button variant="primary" onClick={event => {props.onEdit(clinicMedicine)}}>{i18n.t("update")}</Button>
                                <Button variant="danger" onClick={event => {props.onDelete(clinicMedicine)}}>{i18n.t("delete")}</Button>
                            </ButtonGroup>
                        </Securable>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ClinicMedicineListItem;
