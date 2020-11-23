import i18n from "../i18n"
import Clinic from "./Clinic";

export default interface User {
    idUser : number
    username : string,
    email : string,
    fullName : string,
    password? : string,
    roles : UserRole | null,
    token : string
    workplace : Clinic
}

export const getUserId = (user : User) => {
    return user.idUser;
}

export const getUserLabel = (user : User) => {
    return user.fullName;
}

export const getRoleId = (role : UserRole) : string => {
    return role;
}

export const getRoleLabel= (role : UserRole) : string => {
    return i18n.t(role);
}

export enum UserRole {
    ADMINISTRATOR = "ADMINISTRATOR",
    VETERINARY = "VETERINARY",
    VETERINARY_TECHNICIAN = "VETERINARY_TECHNICIAN"
}
