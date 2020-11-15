import User from "./User";

export default interface Animal {
    idAnimal? : number,
    name : string,
    owner : User | null,
}