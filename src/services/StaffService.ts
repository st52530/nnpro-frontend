import API from "../utils/API";
import {STAFF} from "../utils/APIPaths";
import Staff from "../entities/Staff";


export async function getAllStaff() : Promise<Staff[]> {
    let response = await API.get(STAFF)
    return await response.data;
}

export async function getCertainStaff(id : number) : Promise<Staff> {
    let response = await API.get(STAFF + "/" + id)
    return await response.data;
}

export async function saveNewStaff(staff : Staff) : Promise<void> {
    let response = await API.post(STAFF, staff)
    await response.data;
}

export async function deleteStaff(id : number) : Promise<void> {
    let response = await API.delete(STAFF + "/" + id)
    await response;
}