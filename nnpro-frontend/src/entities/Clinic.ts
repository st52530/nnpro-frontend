import User from "./User";

export default interface Clinic {
    idClinic : number,
    name : string,
    address : string
}
export const getClinicId = (clinic : Clinic) : number => {
    return clinic.idClinic;
}

export const getClinicLabel = (clinic : Clinic) => {
    return clinic.name
}