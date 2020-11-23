import {UserRole} from "./User";

export default interface Staff {
    idUser : number,
    email : string,
    username : string,
    fullName : string,
    password : string,
    role: UserRole
    roles : UserRole
}

export const getStaffId = (staff : Staff) => {
    return staff.idUser;
}

export const getStaffLabel = (staff : Staff) => {
    return staff.fullName;
}