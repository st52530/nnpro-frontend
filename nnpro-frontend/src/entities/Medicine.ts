export default interface Medicine {
    idMedicine? : number,
    name : string,
    code : string,
    substances : string,
    targetAnimals : string,
    form : string,
    dateOfApproval : Date | null,
    numberOfApproval : string,
    approvalHolder : string,
    protectionPeriod : string,
    type : string,
    packageSize : string
}