import React, {createContext,useState,useEffect} from "react";

export const UserContext= createContext();

export function UserProvider({children}){
const [user, setUser] = useState(null);

    async function setUserInfo(userInfo){
        try{
            await localStorage.setItem("user",JSON.stringify(userInfo));
            setUser(userInfo);
        }catch(e){
            console.error('Error dans l\'authentification :'+e);
        }
    }

    async function isUserInfoSaved(){
        try{
            let userInfo = await localStorage.getItem("user");
            setUser(JSON.parse(userInfo));
        }catch(e){
            console.error('Error lors de la récupération des infos user :'+e);
        }
    }

    async function removeUserInfo(){
        try{
            await localStorage.removeItem("user");
        }catch(e){
            console.error('Error lors de la suppression des infos user :'+e);
        }
    }

    useEffect(()=>{
        isUserInfoSaved();
    },[]);

    return (
        <UserContext.Provider value={{user,setUserInfo,removeUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}