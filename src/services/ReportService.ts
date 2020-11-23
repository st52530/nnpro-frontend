import API from "../utils/API";
import {CLIENTS, REPORTS} from "../utils/APIPaths";
import Report from "../entities/Report";


export async function getReports() : Promise<Report[]> {
    let response = await API.get(REPORTS)
    return await response.data;
}

export async function getReport(id : number) : Promise<Report> {
    let response = await API.get(REPORTS + "/" + id)
    return await response.data;
}

export async function getReportsByClient(client_id : number) : Promise<Report[]> {
    let response = await API.get(CLIENTS + "/" + client_id + "/reports")
    return await response.data;
}


export async function saveNewReport(report : Report) : Promise<void> {
    let response = await API.post(REPORTS, report)
    await response.data;
}

export async function updateReport(report : Report) : Promise<void> {
    let response = await API.put(REPORTS + "/" + report.idReport, report)
    await response.data;
}
