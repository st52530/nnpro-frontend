import Consumable from "./Consumable";
import Clinic from "./Clinic";

export default interface ClinicConsumable {
    idClinicConsumable? : number,
    quantityInStock : number,
    consumable : Consumable,
    clinic : Clinic,
}