import Clinic from "../entities/Clinic";
import API from "../utils/API";
import {STATISTICS_CLIENTS, STATISTICS_DIAGNOSIS, STATISTICS_VACCINATION} from "../utils/APIPaths";
import DateStorage from "./DataStorage";


export async function getStatisticsDiagnosis() : Promise<void> {
    let response = await API.get(STATISTICS_DIAGNOSIS)
    return await response.data;
}

export async function getStatisticsClients(year : number, month : number) : Promise<number> {
    let response = await API.get(STATISTICS_CLIENTS + "/" + year + "/" + month)
    return await response.data;
}

export async function getStatisticsClientsInCertainClinic(idClinic : number, year : number, month : number) : Promise<number> {
    let response = await API.get(STATISTICS_CLIENTS + "/" + idClinic + "/" + year + "/" + month)
    return await response.data;
}

export async function getStatisticsVaccination(year : number, month : number) : Promise<number> {
    let response = await API.get(STATISTICS_VACCINATION + "/" + year + "/" + month)
    return await response.data;
}

export async function getStatisticsVaccinationInCertainClinic(idClinic : number, year : number, month : number) : Promise<number> {
    let response = await API.get(STATISTICS_VACCINATION + "/" + idClinic + "/" + year + "/" + month)
    return await response.data;
}