import API, {getAuthenticationToken} from "../utils/API";
import {PDF} from "../utils/APIPaths";
import DateStorage from "./DataStorage";
import axios from "axios";
import {API_ADDRESS} from "../Constants";
const FileDownload = require('js-file-download');

export async function downloadReport(id : number) : Promise<void> {
    axios.get(API_ADDRESS + PDF + "/" + id, {
        responseType : 'blob',
        headers: {
            'Accept': 'application/pdf',
            'Authorization' : getAuthenticationToken()
        },
    }).then(r => r.data)
        .then(data => FileDownload(data, "export.pdf"))

}
