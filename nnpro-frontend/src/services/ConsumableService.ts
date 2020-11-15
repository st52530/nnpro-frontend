import API from "../utils/API";
import User from "../entities/User";
import Consumable from "../entities/Consumable";
import {CLINICS, CONSUMABLES, CLINIC_CONSUMABLE} from "../utils/APIPaths";

export async function getConsumableByClinic(clinicId : number) : Promise<Consumable[]> {
    let response = await API.get(CLINICS + '/' + clinicId + CLINIC_CONSUMABLE + CONSUMABLES)
    return await response.data;
}