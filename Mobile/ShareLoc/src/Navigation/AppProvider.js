import React,{useContext} from 'react';
import { AuthContext } from '../Context/AuthContext';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { UserContext } from '../Context/UserContext';

export default function AppProvider(){
    const {userToken} = useContext(AuthContext);

    return (
        <SafeAreaProvider>
         {!userToken ? <AuthStack/> : <AppStack />}
      </SafeAreaProvider>
    )
}