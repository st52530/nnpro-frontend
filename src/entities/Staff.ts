import {UserRole} from "./User";

export default interface Staff {
    idUser : number,
    email : string,
    username : string,
    fullName : string,
    password : string,
    role: UserRole
}