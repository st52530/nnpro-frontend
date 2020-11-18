import API from "../utils/API";
import {CLIENTS, STAFF} from "../utils/APIPaths";
import User from "../entities/User";
import DataStorage from "./DataStorage"


export async function getClients() : Promise<User[]> {
    let response = await API.get(CLIENTS)
    let clients = await response.data;
    DataStorage.clientsStorage = clients;
    return clients;
}

export async function getClient(id : number) : Promise<User> {
    let response = await API.get(CLIENTS + "/" + id)
    return await response.data;
}

export async function saveNewClient(client : User) : Promise<void> {
    let response = await API.post(CLIENTS + "/sign-up", client)
    await response.data;
}

/* Todo:  */
export async function deleteClient(id : number) : Promise<void> {
    let response = await API.delete(STAFF + "/" + id)
    await response;
}
