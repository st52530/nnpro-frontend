export default interface Consumable {
    idConsumable? : number,
    name : string,
    code : string,
    price : number,
    nameAddition : string,
    groupType : string,
    prescriptionDesignation : string,
    unitOfMeasure : string,
    producer : string,
    countryOfOrigin : string,
    dateOfExpiration : Date | null,
    dateOfChange : Date | null
}