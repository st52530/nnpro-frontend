import {action, observable} from "mobx";

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
import Diagnosis from "../entities/Diagnosis";
import {Operation} from "../entities/Operation";
import {getDiagnoses, getOperations} from "./DiagnosisService";
import {me} from "./AuthService";
import {observer} from "mobx-react";

class DataStorage {


    @observable public loading : boolean = false;
    @observable public currentUser?: User;
    @observable public currentClient?: User;
    @observable public currentClinic?: Clinic;

    public clientsStorage = observable<User>([]);
    public clinicsStorage = observable<Clinic>([]);
    public consumablesStorage = observable<Consumable>([]);
    public medicineStorage = observable<Medicine>([]);
    public reservationsStorage = observable<Reservation>([]);
    public staffStorage = observable<Staff>([]);
    public diagnosesStorage = observable<Diagnosis>([]);
    public operationsStorage = observable<Operation>([]);

    @action
    public async initStorages() {
        this.loading = true;
        Promise.all([me(), getClinics(), getClients(), getConsumables(), getMedicines(), this.loadStaff(), getOperations(), getDiagnoses()]).then(e => {
            this.disableLoader();
        })

    }

    @action
    public disableLoader() {
        this.loading = false
    }

    public async loadStaff() {
        if (this.currentUser && this.currentUser.roles === UserRole.ADMINISTRATOR) {
           return getAllStaff().then(st => {
                this.staffStorage.replace(st);
            });
        } else if (this.currentUser && this.currentUser.roles === UserRole.VETERINARY_TECHNICIAN) {
            return getStaffByClinic(this.currentUser.workplace.idClinic).then(st => {
                this.staffStorage.replace(st);
            });
        }
    }
}

export default new DataStorage();