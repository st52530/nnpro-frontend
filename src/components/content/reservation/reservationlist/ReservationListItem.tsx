import {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import "./ReservationListItem.css"
import Reservation from "../../../../entities/Reservation";
import React from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import i18n from "../../../../i18n";

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
                        <div className="col-10">
                            <h5 className="card-title">Rezervace {new Date(reservation.date).toUTCString()}</h5>
                            <h6>Klinik: {reservation.clinic?.name}</h6>
                            <h6>Klient: {reservation.client?.fullName}</h6>
                        </div>
                        <div className="col-2">
                            <ButtonGroup>
                                <Button variant="primary" onClick={event => {props.onEdit(reservation)}}>{i18n.t("update")}</Button>
                                <Button variant="danger" onClick={event => {props.onDelete(reservation)}}>{i18n.t("delete")}</Button>
                            </ButtonGroup>
                        </div> 
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ReservationListItem;
