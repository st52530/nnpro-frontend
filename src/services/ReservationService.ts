import API from "../utils/API";
import {RESERVATION} from "../utils/APIPaths";
import Reservation from "../entities/Reservation";


export async function getReservations() : Promise<Reservation[]> {
    let response = await API.get(RESERVATION)
    return await response.data;
}

export async function getReservation(id : number) : Promise<Reservation> {
    let response = await API.get(RESERVATION + "/" + id)
    return await response.data;
}

export async function saveNewReservation(reservation : Reservation) : Promise<void> {
    let response = await API.post(RESERVATION, reservation)
    await response.data;
}

export async function deleteReservation(id : number) : Promise<void> {
    let response = await API.delete(RESERVATION + "/" + id)
    await response;
}