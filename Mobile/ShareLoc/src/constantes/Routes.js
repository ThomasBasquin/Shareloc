const DOMAINS="https://shareloc.hugoslr.fr/api";

const URLS={
    login:DOMAINS+"/login_check",
    register:DOMAINS+"/register",
    whoami:DOMAINS+"/user/whoami",
    updateUser:DOMAINS+"/user/{id}",
    getServicesRecipient:DOMAINS+"/user/{user}/services/recipient",
    getPoints:DOMAINS+"/user/{user}/points",
    getCollocation:DOMAINS+"/collocation/{collocation}",
    getInvitations:DOMAINS+"/invitation",
    answerInvitation:DOMAINS+"/invitation/{invitation}/replied",
    getMessageFromColocation:DOMAINS+"/collocation/{idColoc}/messages",
    addMessage:DOMAINS+"/message",
    getServicesFromColocation:DOMAINS+"/collocation/{collocation}/services",
    getServicesRecipient:DOMAINS+"/user/{user}/services/recipient",
    getServicesPerformer:DOMAINS+"/user/{user}/services/performer",
    createService: DOMAINS +"/service",
    getUsersWithoutColocation:DOMAINS+"/user/withoutColocation",
    createInvitation:DOMAINS + "/invitation",
    leaveColocation:DOMAINS+"/user/{user}/leaveCollocation",
    validService:DOMAINS+"/service/{service}/valid",
}

export default URLS;