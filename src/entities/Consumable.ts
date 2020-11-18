export default interface Consumable {
    idConsumable : number,
    name : string,
    code : string,
    price : number,
    nameAddition : string,
    groupType : string,
    prescriptionDesignation : string,
    unitOfMeasure : string,
    producer : string,
    countryOfOrigin : string,
    dateOfExpiration : Date,
    dateOfChange : Date
}

export const getConsumableId = (consumable : Consumable) : number => {
    return consumable.idConsumable;
}

export const getConsumableLabel = (consumable : Consumable) => {
    return consumable.name
}