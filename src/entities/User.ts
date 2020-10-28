

export default interface User {
    username : string,
    email : string,
    fullName : string,
    roles : UserRole,
    token : string
}


export enum UserRole {
    ADMINISTRATOR = "ADMINISTRATOR",
    CLIENT = "CLIENT",
    VETERINARY = "VETERINARY",
    VETERINARY_TECHNICIAN = "VETERINARY_TECHNICIAN"
}
