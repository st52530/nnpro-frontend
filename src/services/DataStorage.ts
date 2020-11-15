import {observable} from "mobx";
import User from "../entities/User";
import Clinic from "../entities/Clinic";
import {getClinics} from "./ClinicService";
import {getClients} from "./ClientService";
import Reservation from "../entities/Reservation";



class DataStorage {
    @observable public currentUser? : User;
    public clientsStorage = observable<User>([]);
    public clinicsStorage = observable<Clinic>([]);
    public reservationsStorage = observable<Reservation>([]);

    public async initStorages() {
        await getClinics();
        await getClients();
    }
}

export default new DataStorage();