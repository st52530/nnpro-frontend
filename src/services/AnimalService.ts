import API from "../utils/API";
import {ANIMALS, CLIENTS, MESSAGES} from "../utils/APIPaths";
import Animal from "../entities/Animal";
import AnimalMessage from "../entities/AnimalMessage";

export async function getAnimals() : Promise<Animal[]> {
    let response = await API.get(ANIMALS)
    return await response.data;
}

export async function getAnimalsByClient(id : number) : Promise<Animal[]> {
    let response = await API.get(CLIENTS + '/' + id + ANIMALS)
    return await response.data;
}

export async function getMessagesByAnimal(id : number) : Promise<AnimalMessage[]> {
    let response = await API.get(ANIMALS + '/' + id + MESSAGES)
    return await response.data;
}

export async function getAnimal(id : number) : Promise<Animal> {
    let response = await API.get(ANIMALS + "/" + id)
    return await response.data;
}

export async function saveNewAnimal(animal : Animal, client_id : number) : Promise<void> {
    let response = await API.post(ANIMALS + "/user/" + client_id, animal)
    await response.data;
}

export async function deleteAnimal(id : number) : Promise<void> {
    let response = await API.delete(ANIMALS + "/" + id)
    await response;
}