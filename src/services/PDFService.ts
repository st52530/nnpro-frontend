import Clinic from "../entities/Clinic";
import API from "../utils/API";
import {CLINICS} from "../utils/APIPaths";
import DateStorage from "./DataStorage";


export async function getClinics() : Promise<Clinic[]> {
    let response = await API.get(CLINICS)
    let clinics = await response.data;
    DateStorage.clinicsStorage.replace(clinics);
    return clinics;
}

export async function getClinic(id : number) : Promise<Clinic> {
    let response = await API.get(CLINICS + "/" + id)
    return await response.data;
}

export async function saveNewClinic(clinic : Clinic) : Promise<void> {
    let response = await API.post(CLINICS, clinic)
    await response.data;
}

export async function deleteClinic(id : number) : Promise<void> {
    let response = await API.delete(CLINICS + "/" + id)
    await response;
}