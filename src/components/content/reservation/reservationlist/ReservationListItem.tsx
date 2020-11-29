import React, {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import "./ReservationListItem.css"
import Reservation from "../../../../entities/Reservation";
import {Button, ButtonGroup} from "react-bootstrap";
import i18n from "../../../../i18n";
import Securable from "../../../common/secureable/Securable";
import {UserRole} from "../../../../entities/User";

interface Props {
    reservation : Reservation
    onDelete : (reservation : Reservation) => void;
    onEdit : (reservation : Reservation) => void;
}

const ReservationListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let reservation : Reservation = props.reservation;

    const URL = RouterConstants.clinicDetails.replace(":id", String(reservation.idReservation))
    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-9">
                            <h5 className="card-title">Rezervace {new Date(reservation.date).toUTCString()}</h5>
                            <h6>{i18n.t("dfClinic")}: {reservation.clinic?.name}</h6>
                            <h6>{i18n.t("dfClient")}: {reservation.client?.fullName}</h6>
                        </div>
                        <div className="col-2">
                            <Securable access={[UserRole.ADMINISTRATOR, UserRole.VETERINARY_TECHNICIAN]}>
                                <ButtonGroup>
                                    <Button variant="primary" onClick={event => {props.onEdit(reservation)}}>{i18n.t("update")}</Button>
                                    <Button variant="danger" onClick={event => {props.onDelete(reservation)}}>{i18n.t("delete")}</Button>
                                </ButtonGroup>
                            </Securable>
                        </div> 
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ReservationListItem;
