import API from "../utils/API";
import {PDF} from "../utils/APIPaths";
import DateStorage from "./DataStorage";


export async function getPDFs() : Promise<File[]> {
    let response = await API.get(PDF)
    let clinics = await response.data;
    DateStorage.clinicsStorage.replace(clinics);
    return clinics;
}

export async function getPDF(id : number) : Promise<File> {
    let response = await API.get(PDF + "/" + id)
    return await response.data;
}
