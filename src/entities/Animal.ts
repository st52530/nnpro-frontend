import User from "./User";

export default interface Animal {
    idAnimal : number,
    name : string,
    owner : User | null
}

export const getAnimalId = (animal : Animal) : number => {
    return animal.idAnimal;
}

export const getAnimalLabel = (animal : Animal) : string => {
    return animal.name;
}