const DOMAINS="https://shareloc.hugoslr.fr/api";

const URLS={
    login:DOMAINS+"/login_check",
    register:DOMAINS+"/register",
    whoami:DOMAINS+"/user/whoami",
    getServicesRecipient:DOMAINS+"/user/{user}/services/recipient",
    getMessageFromColocation:DOMAINS+"/collocation/{idColoc}/messages",
    addMessage:DOMAINS+"/message",
    getServicesFromColocation:DOMAINS+"/collocation/{collocation}/services",
    getInvitations:DOMAINS+"/invitation",
    answerInvitation:DOMAINS+"/invitation/{invitation}/replied",
    getCollocation:DOMAINS+"/collocation/{collocation}",
    getServicesPerformer:DOMAINS+"/user/{user}/services/performer",
    createService: DOMAINS +"/service",
    leaveColocation : DOMAINS + "/user/{user}/leaveCollocation"
}

export default URLS;