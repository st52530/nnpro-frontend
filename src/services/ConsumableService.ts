import API from "../utils/API";
import User from "../entities/User";
import Consumable from "../entities/Consumable";
import {CLINICS, CONSUMABLES, CLINIC_CONSUMABLE} from "../utils/APIPaths";

export async function getConsumableByClinic(clinicId : number) : Promise<Consumable[]> {
    //let response = await API.get(CLINICS + clinicId + CLINIC_CONSUMABLE + CONSUMABLES)
    //return await response.data;

    return [
        {
            idConsumable : 1, 
            name : 'Consumable test name', 
            code : 'Consumable test code', 
            price : 15,
            nameAddition : 'Consumable test code', 
            groupType : 'Consumable test code', 
            prescriptionDesignation : 'Consumable test code', 
            unitOfMeasure : 'Consumable test code', 
            producer : 'Consumable test code', 
            countryOfOrigin : 'Consumable test code',
            dateOfExpiration : null,
            dateOfChange : null
        }]
}