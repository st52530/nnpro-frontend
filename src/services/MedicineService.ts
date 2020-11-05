import Medicine from "../entities/Medicine";
import API from "../utils/API";
import {MEDICINE} from "../utils/APIPaths";


export async function getMedicines() : Promise<Medicine[]> {
    let response = await API.get(MEDICINE)
    return await response.data;
}

export async function getMedicine(id : number) : Promise<Medicine> {
    let response = await API.get(MEDICINE + "/" + id)
    return await response.data;
}

export async function saveNewMedicine(clinic : Medicine) : Promise<void> {
    let response = await API.post(MEDICINE, clinic)
    await response.data;
}

export async function deleteMedicine(id : number) : Promise<void> {
    let response = await API.delete(MEDICINE + "/" + id)
    await response;
}