const DOMAINS="https://shareloc.hugoslr.fr/api";

const URLS={
    login:DOMAINS+"/login_check",
    register:DOMAINS+"/register",
    whoami:DOMAINS+"/user/whoami",
    updateUser:DOMAINS+"/user/{id}",
    getServicesRecipient:DOMAINS+"/user/{user}/services/recipient",
    getPoints:DOMAINS+"/user/{user}/points",
    getCollocation:DOMAINS+"/collocation/{collocation}",
}

export default URLS;