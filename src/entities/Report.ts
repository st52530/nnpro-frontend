import Animal from "./Animal";
import Consumable from "./Consumable";
import Medicine from "./Medicine";
import Staff from "./Staff";
import Diagnosis from "./Diagnosis";
import {Operation} from "./Operation";

export default interface Report {
    idReport? : number,
    textDescription : string,
    textDiagnosis: string,
    textRecommendation: string,
    reportState: ReportStatus,
    animal? : Animal,
    date: Date,
    veterinary? : Staff,
    diagnosis? : Diagnosis,
    operation? : Operation,
    medicines : Medicine[],
    consumables : Consumable[],
}

export enum ReportStatus {
    READY = "READY",
    DONE = "DONE",
}
