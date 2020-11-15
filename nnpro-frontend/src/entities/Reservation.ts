import Clinic from "./Clinic";
import User from "./User";

export default interface Reservation {
    idReservation? : number,
    date : Date,
    clinic : Clinic,
    client : User
}