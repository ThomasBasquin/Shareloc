import { getJWTToken } from "./Fonctions";

type IFetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
type IFetchType = "JSON" | "MULTIPART/FORM-DATA";

const JSON_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

async function checkStatus(response: Response) {
    if (!response.ok) {
        const error = await response.json();
        throw error;
    }
    return await response.json();
}


export default async function useFetch(url:string,method:"POST"|"PUT"|"GET"|"DELETE"="GET",body:any,extraHeaders={}, extraParams = {}){

    if (method === "GET" && body) console.error("Une requête GET ne peut pas contenir de body.");
    
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {...JSON_HEADERS, ...extraHeaders },
        ...extraParams,
    })
        .then(checkStatus)
        .catch((error: Error) => {
            return Promise.reject(error);
        });
}