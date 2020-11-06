import API from "../utils/API";
import {CLIENTS} from "../utils/APIPaths";
import User from "../entities/User";

export async function getClients() : Promise<User[]> {
    let response = await API.get(CLIENTS)
    return await response.data;
}

export async function getClient(id : number) : Promise<User> {
    let response = await API.get(CLIENTS + "/" + id)
    return await response.data;
}

export async function saveNewClient(client : User) : Promise<void> {
    let response = await API.post(CLIENTS + "/sign-up", client)
    await response.data;
}

export async function deleteClient(id : number) : Promise<void> {
    let response = await API.delete(CLIENTS + "/" + id)
    await response;
}