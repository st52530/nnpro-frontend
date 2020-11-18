import {FC, PropsWithChildren} from "react";
import Reservation from "../../../../entities/Reservation";
import React from "react";

interface Props {
    reservation : Reservation
}

const ClientReservationsListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let reservation : Reservation = props.reservation;

    return (
        <div className="card consumable-card my-1">
            <div className="card-body py-2">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">{new Date(reservation.date).toUTCString()}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientReservationsListItem;
