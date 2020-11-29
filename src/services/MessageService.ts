import API from "../utils/API";
import {ANIMAL, MESSAGES} from "../utils/APIPaths";
import AnimalMessage from "../entities/AnimalMessage";

export async function saveNewMessage(message : AnimalMessage) : Promise<void> {
    let response = await API.post(MESSAGES + ANIMAL + "/" + message.animal.idAnimal, message)
    await response.data;
}