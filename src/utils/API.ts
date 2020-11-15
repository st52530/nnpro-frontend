import axios from 'axios'
import {API_ADDRESS, REQUEST_TOKEN_PREFIX, TOKEN_KEY} from "../Constants";


const API = axios.create({
    baseURL: API_ADDRESS,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(
    config => {
        let token = getAuthenticationToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config
    }
)

API.interceptors.response.use(
    value => {return value},
    error => {
        console.warn(error);
    }
)
function getAuthenticationToken() : string | undefined {
    let token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
        return REQUEST_TOKEN_PREFIX + token;
    }
    token = localStorage.getItem(TOKEN_KEY)
    if (token){
        return REQUEST_TOKEN_PREFIX + token;
    }
    return undefined;
}

export default API;