import {getAuthenticationToken} from "../utils/API";
import {EXCEL_CONSUMABLES, EXCEL_DIAGNOSES, EXCEL_MEDICINES, EXCEL_OPERATIONS} from "../utils/APIPaths";
import DataStorage from "./DataStorage"
import axios from "axios";
import {API_ADDRESS} from "../Constants";

const FileAPI = axios.create({
    baseURL: API_ADDRESS,
    responseType: "json",
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

FileAPI.interceptors.request.use(
    config => {
        let token = getAuthenticationToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config
    }
)

export async function importExcelOperations(file : Blob) : Promise<void> {
    let formData = new FormData()
    formData.append("file", file)
    return FileAPI.post(EXCEL_OPERATIONS, formData)
}

export async function importExcelConsumables(file : Blob) : Promise<void> {
    let formData = new FormData()
    formData.append("file", file)
    return FileAPI.post(EXCEL_CONSUMABLES, formData)
}

export async function importExcelDiagnoses(file : Blob) : Promise<void> {
    let formData = new FormData()
    formData.append("file", file)
    return FileAPI.post(EXCEL_DIAGNOSES, formData)
}

export async function importExcelMedicines(file : Blob) : Promise<void> {
    let formData = new FormData()
    formData.append("file", file)
    return FileAPI.post(EXCEL_MEDICINES, formData)
}