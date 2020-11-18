import API from "../utils/API";
import Consumable from "../entities/Consumable";
import {CLINICS, CONSUMABLES, CLINIC_CONSUMABLE} from "../utils/APIPaths";
import ClinicConsumable from "../entities/ClinicConsumable";
import DateStorage from "./DataStorage";

export async function getConsumables() : Promise<Consumable[]> {
    let response = await API.get(CONSUMABLES);
    let consumables = await response.data;
    DateStorage.clinicsStorage.replace(consumables);
    return consumables;
}

export async function getConsumablesByClinic(clinicId : number) : Promise<ClinicConsumable[]> {
    let response = await API.get(CLINICS + '/' + clinicId + CLINIC_CONSUMABLE + CONSUMABLES)
    return await response.data;
}

export async function saveNewConsumable(consumable : Consumable) : Promise<void> {
    let response = await API.post(CONSUMABLES, consumable)
    await response.data;
}

export async function saveNewConsumableByClinic(consumable : ClinicConsumable) : Promise<void> {
    let response = await API.post(CONSUMABLES, consumable)
    await response.data;
}
