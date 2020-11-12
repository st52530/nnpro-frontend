import API from "../utils/API";
import {ANIMALS} from "../utils/APIPaths";
import User from "../entities/User";
import Animal from "../entities/Animal";

export async function getAnimals() : Promise<Animal[]> {
    let response = await API.get(ANIMALS)
    return await response.data;
}

export async function getAnimal(id : number) : Promise<Animal> {
    let response = await API.get(ANIMALS + "/" + id)
    return await response.data;
}

export async function saveNewAnimal(animal : Animal) : Promise<void> {
    let response = await API.post(ANIMALS + "/sign-up", animal)
    await response.data;
}

export async function deleteAnimal(id : number) : Promise<void> {
    let response = await API.delete(ANIMALS + "/" + id)
    await response;
}