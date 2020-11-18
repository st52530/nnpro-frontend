import API from "../utils/API";
import {CLINIC, STAFF} from "../utils/APIPaths";
import Staff from "../entities/Staff";


export async function getAllStaff() : Promise<Staff[]> {
    let response = await API.get(STAFF)
    return await response.data;
}

export async function getCertainStaff(id : number) : Promise<Staff> {
    let response = await API.get(STAFF + "/" + id)
    return await response.data;
}

export async function getStaffByClinic(clinicId : number) : Promise<Staff[]> {
    let response = await API.get(STAFF + CLINIC + "/" + clinicId)
    return await response.data;
}

export async function saveNewStaff(staff : Staff, id : number) : Promise<void> {
    let response = await API.post(STAFF + CLINIC + "/" + id, staff)
    await response.data;
}

export async function updateStaff(staff : Staff, clinicId : number) : Promise<void> {
    let response = await API.put(STAFF + '/' + staff.idUser + CLINIC + "/" + clinicId, staff)
    await response.data;
}

export async function deleteStaff(id : number) : Promise<void> {
    let response = await API.delete(STAFF + "/" + id)
    await response;
}