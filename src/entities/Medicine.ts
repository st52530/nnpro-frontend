export default interface Medicine {
    idMedicine : number,
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

export const getMedicineId = (medicine : Medicine) : number => {
    return medicine.idMedicine || 0
}

export const getMedicineLabel = (medicine : Medicine) => {
    return medicine.name
}