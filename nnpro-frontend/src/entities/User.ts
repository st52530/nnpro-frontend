

export default interface User {
    idUser : number
    username : string,
    email : string,
    fullName : string,
    password? : string,
    roles : UserRole | null,
    token : string
}

export const getUserId = (user : User) => {
    return user.idUser;
}

export const getUserLabel = (user : User) => {
    return user.fullName;
}

export enum UserRole {
    ADMINISTRATOR = "ADMINISTRATOR",
    CLIENT = "CLIENT",
    VETERINARY = "VETERINARY",
    VETERINARY_TECHNICIAN = "VETERINARY_TECHNICIAN"
}
