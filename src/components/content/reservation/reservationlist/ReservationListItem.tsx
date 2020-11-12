import {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./ReservationListItem.css"
import Reservation from "../../../../entities/Reservation";
import React from "react";

interface Props {
    reservation : Reservation
}

const ReservationListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let reservation : Reservation = props.reservation;

    const URL = RouterConstants.clinicDetails.replace(":id", String(reservation.idReservation))
    return (
        <div className="card-link mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Rezervace </h5>
                </div>
            </div>
        </div>
    )
}

export default ReservationListItem;
