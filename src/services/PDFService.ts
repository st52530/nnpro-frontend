import API from "../utils/API";
import {PDF} from "../utils/APIPaths";
import DateStorage from "./DataStorage";


export async function getPDFs() : Promise<File[]> {
    let response = await API.get(PDF)
    let clinics = await response.data;
    DateStorage.clinicsStorage.replace(clinics);
    return clinics;
}

export async function downloadReport(id : number) : Promise<void> {
    let req = new XMLHttpRequest();
    req.open("GET", PDF + "/" + id, true)
    req.responseType = "blob"

    req.onload = () => {
        let file = new File([req.response], "Report.pdf" ,{ type : 'application/pdf'})
        let fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, "_blank")
    }


    req.send();
}
