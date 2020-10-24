import User from "../entities/User";

class CurrentUserStore {
    private _user : User | undefined

    get user(): User | undefined {
        return this._user;
    }

    set user(value: User | undefined) {
        this._user = value;
    }
}

export default new CurrentUserStore()