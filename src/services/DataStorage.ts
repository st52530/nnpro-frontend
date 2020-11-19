import {observable} from "mobx";

import User from "../entities/User";
import {getClients} from "./ClientService";

import Clinic from "../entities/Clinic";
import {getClinics} from "./ClinicService";

import Reservation from "../entities/Reservation";

import Consumable from "../entities/Consumable";
import { getConsumables } from "./ConsumableService";
import Medicine from "../entities/Medicine";
import {getMedicines} from "./MedicineService";

class DataStorage {
    @observable public currentUser? : User;
    @observable public currentClient? : User;
    @observable public currentClinic? : Clinic;

    public clientsStorage = observable<User>([]);
    public clinicsStorage = observable<Clinic>([]);
    public consumablesStorage = observable<Consumable>([]);
    public medicineStorage = observable<Medicine>([]);
    public reservationsStorage = observable<Reservation>([]);

    public async initStorages() {
        await getClinics();
        await getClients();
        await getConsumables();
        await getMedicines()
    }
}

export default new DataStorage();