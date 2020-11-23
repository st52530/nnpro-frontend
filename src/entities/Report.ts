import Animal from "./Animal";
import Consumable from "./Consumable";
import Medicine from "./Medicine";
import Staff from "./Staff";

export default interface Report {
    idReport? : number,
    textDescription : string,
    textDiagnosis: string,
    textRecommendation: string,
    reportState: ReportStatus,
    animal? : Animal,
    date: Date,
    veterinary? : Staff,
    diagnosis? : string,
    operation? : string,
    medicine? : Medicine,
    consumables? : Consumable,
}

export enum ReportStatus {
    READY = "READY",
    DONE = "DONE",
}
