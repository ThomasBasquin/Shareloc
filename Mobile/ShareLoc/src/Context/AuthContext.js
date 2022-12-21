import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext,useState,useEffect} from "react";
import URLS from "../constantes/Routes";
import useFetch from "../constantes/UseFetch";

export const AuthContext= createContext();

export function AuthProvider({children}){
const [userToken, setUserToken] = useState(null);

    async function login(email,password){
        return useFetch(URLS.login,"POST",{email,password})
        .then(({token}) => {
            console.log(token);
            setUserToken(token);
            AsyncStorage.setItem("userToken",token);
        })
    }

    function logout(){
        setUserToken(null);
        AsyncStorage.removeItem("userToken");
    }

    async function isLoggedIn(){
        try{
            let userToken = await AsyncStorage.getItem("userToken");
            setUserToken(userToken);
        }catch(e){
            console.error('Error dans l\'authentification :'+e);
        }
    }

    useEffect(()=>{
        isLoggedIn();
    },[]);

    return (
        <AuthContext.Provider value={{login,logout,userToken}}>
            {children}
        </AuthContext.Provider>
    )
}