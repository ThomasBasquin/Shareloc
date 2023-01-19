const DOMAINS="https://shareloc.hugoslr.fr/api";

const URLS={
    login:DOMAINS+"/login_check",
    register:DOMAINS+"/register",
    whoami:DOMAINS+"/user/whoami",
    getServicesRecipient:DOMAINS+"/user/{user}/services/recipient",
    getMessageFromColocation:DOMAINS+"/collocation/{idColoc}/messages",
}

export default URLS;