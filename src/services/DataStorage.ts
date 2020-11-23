import {observable} from "mobx";

import User, {UserRole} from "../entities/User";
import {getClients} from "./ClientService";

import Clinic from "../entities/Clinic";
import {getClinics} from "./ClinicService";

import Reservation from "../entities/Reservation";

import Consumable from "../entities/Consumable";
import {getConsumables} from "./ConsumableService";

import Medicine from "../entities/Medicine";
import {getMedicines} from "./MedicineService";
import Staff from "../entities/Staff";
import {getAllStaff, getStaffByClinic} from "./StaffService";

class DataStorage {
    @observable public currentUser?: User;
    @observable public currentClient?: User;
    @observable public currentClinic?: Clinic;

    public clientsStorage = observable<User>([]);
    public clinicsStorage = observable<Clinic>([]);
    public consumablesStorage = observable<Consumable>([]);
    public medicineStorage = observable<Medicine>([]);
    public reservationsStorage = observable<Reservation>([]);
    public staffStorage = observable<Staff>([]);

    public async initStorages() {
        await getClinics();
        await getClients();
        await getConsumables();
        await getMedicines();
        await this.loadStaff();
    }

    public async loadStaff() {
        if (this.currentUser && this.currentUser.roles === UserRole.ADMINISTRATOR) {
            getAllStaff().then(st => {
                this.staffStorage.replace(st);
            });
        } else if (this.currentUser && this.currentUser.roles === UserRole.VETERINARY_TECHNICIAN) {
            getStaffByClinic(this.currentUser.workplace.idClinic).then(st => {
                this.staffStorage.replace(st);
            });
        }
    }
}

export default new DataStorage();