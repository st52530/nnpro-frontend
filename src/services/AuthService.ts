
import User from "../entities/User";
import {TOKEN_KEY} from "../Constants";
import API from "../utils/API";
import {USER_LOGIN} from "../utils/APIPaths";
import CurrentUserStore from "../storage/CurrentUserStore";

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
    let user : User = await response.data
    if (permanent) {
        localStorage.setItem(TOKEN_KEY, user.token);
    } else {
        sessionStorage.setItem(TOKEN_KEY, user.token);
    }
    CurrentUserStore.user = user;
    return user;
}

export const logout = () : void => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    window.location.reload();
}