import Medicine from "../entities/Medicine";
import API from "../utils/API";
import {MEDICINE} from "../utils/APIPaths";


export async function getMedicines() : Promise<Medicine[]> {
    //let response = await API.get(MEDICINE)
    //return await response.data;
    
    return [
        {
            idMedicine : 1, 
            name : 'Test medicine name',
            code : 'Test medicine code',
            substances : 'Test medicine substances',
            targetAnimals : 'Test medicine targetAnimals',
            form : 'Test medicine form',
            dateOfApproval : null,
            numberOfApproval : 'Test medicine numberOfApproval',
            approvalHolder : 'Test medicine approvalHolder',
            protectionPeriod : 'Test medicine protectionPeriod',
            type : 'Test medicine type',
            packageSize : 'Test medicine packageSize',
        },
    ]
}

export async function getMedicine(id : number) : Promise<Medicine> {
    let response = await API.get(MEDICINE + "/" + id)
    return await response.data;
}

export async function getMedicineByClinic(clinicId : number) : Promise<Medicine[]> {
    //let response = await API.get(STAFF + "/clinic/" + clinicId)
    //return await response.data;

    return [
        {
            idMedicine : 1, 
            name : 'medicine test name',
            code : 'medicine test code',
            substances : 'medicine test substances',
            targetAnimals : 'medicine test targetAnimals',
            form : 'medicine test form',
            dateOfApproval : null,
            numberOfApproval : 'medicine test numberOfApproval',
            approvalHolder : 'medicine test approvalHolder',
            protectionPeriod : 'medicine test protectionPeriod',
            type : 'medicine test type',
            packageSize : 'medicine test packageSize',
        },
    ]
}

export async function saveNewMedicine(clinic : Medicine) : Promise<void> {
    let response = await API.post(MEDICINE, clinic)
    await response.data;
}

export async function deleteMedicine(id : number) : Promise<void> {
    let response = await API.delete(MEDICINE + "/" + id)
    await response;
}