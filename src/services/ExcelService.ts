import {getAuthenticationToken} from "../utils/API";
import {EXCEL} from "../utils/APIPaths";
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

export async function importExcel(file : Blob) : Promise<void> {
    let formData = new FormData()
    formData.append("excel file", file)
    return FileAPI.post(EXCEL, formData)
}
