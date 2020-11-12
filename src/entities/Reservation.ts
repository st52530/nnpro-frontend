import Clinic from "./Clinic";
import User from "./User";

export default interface Staff {
    idReservation? : number,
    date : Date | null,
    clinic : Clinic | null,
    client : User | null
}