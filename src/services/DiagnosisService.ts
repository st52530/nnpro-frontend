import Diagnosis from "../entities/Diagnosis";
import API from "../utils/API";
import {DIAGNOSES, OPERATIONS} from "../utils/APIPaths";
import DataStorage from "./DataStorage";
import {Operation} from "../entities/Operation";

export async function getDiagnoses() : Promise<Diagnosis[]> {
    let response = await API.get(DIAGNOSES)
    let data =  await response.data;
    DataStorage.diagnosesStorage.replace(data);
    return data;
}

export async function getOperations() : Promise<Operation[]> {
    let response = await API.get(OPERATIONS)
    let data =  await response.data;
    DataStorage.operationsStorage.replace(data);
    return data;
}
