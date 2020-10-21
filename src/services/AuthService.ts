const TOKEN_KEY = "token"



const testuser = {
    username : "admin",
    password : "admin"
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

export async function login(username : string, password : string, permanent : boolean) : Promise<boolean> {
    await new Promise( resolve  => setTimeout(resolve, 3000));
    if (testuser.username === username && testuser.password === password){
        if (permanent) {
            localStorage.setItem(TOKEN_KEY, "todo");
        } else {
            sessionStorage.setItem(TOKEN_KEY, "todo");
        }

        return true;
    }
    return false;
}

export const logout = () : void => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    window.location.reload();
}