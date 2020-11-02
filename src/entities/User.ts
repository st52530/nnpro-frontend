

export default interface User {
    idUser : number
    username : string,
    email : string,
    fullName : string,
    password? : string,
    roles : UserRole,
    token : string
}


export enum UserRole {
    ADMINISTRATOR = "ADMINISTRATOR",
    CLIENT = "CLIENT",
    VETERINARY = "VETERINARY",
    VETERINARY_TECHNICIAN = "VETERINARY_TECHNICIAN"
}
