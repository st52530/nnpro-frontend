import API from "../utils/API";
import {CLIENTS, REPORTS} from "../utils/APIPaths";
import Report, {ReportStatus} from "../entities/Report";


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

export async function getReportsByClinic(clinicId : number) : Promise<Report[]> {
    let response = await API.get(REPORTS, {params : {clinicId : clinicId}})
    return await response.data;
}

export async function getReportsByVeterinary(veterinaryId : number) : Promise<Report[]> {
    let response = await API.get(REPORTS, {params : {veterinaryId : veterinaryId}})
    return await response.data;
}


export async function saveNewReport(report : Report) : Promise<void> {
    let response = await API.post(REPORTS, report)
    await response.data;
}

export async function finishReport(report : Report) : Promise<void> {
    let response = await API.post(REPORTS + "/" + report.idReport + "/finish", report)
    await response.data;
}
