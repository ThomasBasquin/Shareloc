import React, {createContext,useState,useEffect,useContext} from "react";
import URLS from "../constant/Routes";
import useFetch from "../constant/UseFetch";
import { UserContext } from "./UserContext";

export const AuthContext= createContext();

export function AuthProvider({children}){
    const [userToken, setUserToken] = useState(null);
    const {setUserInfo,removeUserInfo} = useContext(UserContext);

    async function login(email,password){
        return useFetch(URLS.login,"POST",{email,password})
        .then(({token,data}) => {
            setUserToken(token);
            setUserInfo(data);
            localStorage.setItem("userToken",token);
        })
    }

    async function register(email,firstname,lastname,password){
        return useFetch(URLS.register,"POST",{email,firstname,lastname,password})
        .then(() => {
            login(email,password);
        })
    }

    function logout(){
        setUserToken(null);
        localStorage.removeItem("userToken");
        removeUserInfo();
    }

    function isLoggedIn(){
            let userToken = localStorage.getItem("userToken");
            setUserToken(userToken);
    }

    useEffect(()=>{
        isLoggedIn();
    },[]);

    return (
        <AuthContext.Provider value={{login,logout,userToken,register}}>
            {children}
        </AuthContext.Provider>
    )
}