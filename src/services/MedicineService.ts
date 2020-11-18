import Medicine from "../entities/Medicine";
import ClinicMedicine from "../entities/ClinicMedicine"
import API from "../utils/API";
import {CLINICS, CLINIC_MEDICINE, MEDICINE, MEDICINES} from "../utils/APIPaths";


export async function getMedicines() : Promise<Medicine[]> {
    let response = await API.get(MEDICINES)
    return await response.data;
}

export async function getMedicine(id : number) : Promise<Medicine> {
    let response = await API.get(MEDICINE + "/" + id)
    return await response.data;
}

export async function getMedicinesByClinic(clinicId : number) : Promise<ClinicMedicine[]> { 
    let response = await API.get(CLINICS + '/' + clinicId + CLINIC_MEDICINE + MEDICINES)
    return await response.data;
}

export async function saveNewMedicine(medicine : Medicine) : Promise<void> {
    let response = await API.post(MEDICINES, medicine)
    await response.data;
}

export async function deleteMedicine(id : number) : Promise<void> {
    let response = await API.delete(MEDICINE + "/" + id)
    await response;
}