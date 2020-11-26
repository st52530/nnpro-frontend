import Animal from "./Animal";
import Staff from "./Staff";

export default interface AnimalMessage {
    idMessage? : number,
    text : string,
    date : Date,
    sender : Staff,
    animal : Animal,
}