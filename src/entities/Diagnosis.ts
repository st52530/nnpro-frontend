
export default interface Diagnosis {
    "idDiagnosis": number,
    "name": string,
    "type": string,
    "targetAnimals": string,
    "symptoms": string,
    "incubationPeriod": string,
    "treatment": string,
    "prevention": string
}

export const getDiagnosisLabel = (op : Diagnosis) => {
    return op.name
}

export const getDiagnosisID = (op : Diagnosis) => {
    return op.idDiagnosis
}