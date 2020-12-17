
import User, {UserRole} from "../entities/User";
import {TOKEN_KEY} from "../Constants";
import API from "../utils/API";
import {ME, USER_LOGIN} from "../utils/APIPaths";
import DataStorage from "./DataStorage";

interface LoginRequest {
    username : string,
    password : string
}

export const isLoggedIn = () : boolean => {
    if (localStorage.getItem(TOKEN_KEY) !== null) {
        return true;
    }
    if (sessionStorage.getItem(TOKEN_KEY) !== null) {
        return true;
    }
    return false;
}

export async function login(username : string, password : string, permanent : boolean) : Promise<User> {
    let request : LoginRequest = {
        username : username,
        password : password
    }
    let response = await API.post(USER_LOGIN, request);
    let user : any = await response.data
    if(user.user.roles === UserRole.CLIENT){
        logout();
        return user;
    }
    if (permanent) {
        localStorage.setItem(TOKEN_KEY, user.token);
    } else {
        sessionStorage.setItem(TOKEN_KEY, user.token);
    }
    DataStorage.currentUser = user.user;
    DataStorage.initStorages();
    return user;
}

export async function me() : Promise<User | undefined> {
    let token : string | null = localStorage.getItem(TOKEN_KEY);
    if (token == null) {
        token = sessionStorage.getItem(TOKEN_KEY);
    }
    if (token == null) {
        return undefined;
    }

    let response = await API.get(ME)
    try {
        let user : User = await response.data;
        DataStorage.currentUser = user;
        return user;
    } catch (e) {
        logout()
    }

}

export const logout = () : void => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    window.location.reload();
}
