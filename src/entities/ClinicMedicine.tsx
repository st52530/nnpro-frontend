import Medicine from "./Medicine";
import Clinic from "./Clinic";

export default interface Clinicmedicine {
    idClinicMedicine? : number,
    quantityInStock : number,
    medicine : Medicine,
    clinic : Clinic,
}