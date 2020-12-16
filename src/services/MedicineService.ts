import Medicine from "../entities/Medicine";
import ClinicMedicine from "../entities/ClinicMedicine"
import API from "../utils/API";
import {CLINICS, CLINIC_MEDICINE, MEDICINE, MEDICINES, CONSUMABLES} from "../utils/APIPaths";
import DataStorage from "./DataStorage";
import ClinicConsumable from "../entities/ClinicConsumable";
import {me} from "./AuthService";


export async function getMedicines() : Promise<Medicine[]> {
    let response = await API.get(MEDICINES)
    let data =  await response.data;
    DataStorage.medicineStorage = data;
    return data;
}

export async function getMedicine(id : number) : Promise<Medicine> {
    let response = await API.get(MEDICINE + "/" + id)
    return await response.data;
}

export async function getMedicinesByClinic(clinicId : number) : Promise<ClinicMedicine[]> { 
    let response = await API.get(CLINICS + '/' + clinicId + CLINIC_MEDICINE + MEDICINES)
    return await response.data;
}

export async function saveNewMedicineByClinic(medicine : ClinicMedicine) : Promise<void> {
    let response = await API.post(`/clinics/${medicine.clinic.idClinic}/clinic-medicine/medicine/${medicine.medicine.idMedicine}`, medicine)
    await response.data;
}

export async function updateMedicineByClinic(medicine : ClinicMedicine) : Promise<void> {
    let response = await API.put(`/clinics/clinic-medicine/${medicine.idClinicMedicine}`, medicine)
    await response.data;
}

export async function deleteMedicineByClinic(id : number) : Promise<void> {
    let response = await API.delete(`/clinics/clinic-medicine/` + id)
    await response;
}

export async function saveNewMedicine(medicine : Medicine) : Promise<void> {
    let response = await API.post(MEDICINES, medicine)
    await response.data;
}

export async function deleteMedicine(id : number) : Promise<void> {
    let response = await API.delete(MEDICINE + "/" + id)
    await response;
}