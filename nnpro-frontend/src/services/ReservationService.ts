import API from "../utils/API";
import {CLIENTS, RESERVATIONS} from "../utils/APIPaths";
import Reservation from "../entities/Reservation";


export async function getReservations() : Promise<Reservation[]> {
    let response = await API.get("/reservations")
    return await response.data;
}

export async function getReservation(id : number) : Promise<Reservation> {
    let response = await API.get("/reservations" + "/" + id)
    return await response.data;
}

export async function getReservationsByClient(client_id : number) : Promise<Reservation[]> { 
    let response = await API.get(CLIENTS + "/" + client_id + RESERVATIONS)
    return await response.data;
}

export async function saveNewReservation(reservation : Reservation) : Promise<void> {
    let response = await API.post(`/reservations/clinic/${reservation.clinic?.idClinic}/client/${reservation.client?.idUser}`, reservation)
    await response.data;
}

export async function updateReservation(reservation : Reservation) : Promise<void> {
    let response = await API.put(`/reservations/${reservation.idReservation}`, reservation)
    await response.data;
}

export async function deleteReservation(id : number) : Promise<void> {
    let response = await API.delete("/reservations" + "/" + id)
    await response;
}