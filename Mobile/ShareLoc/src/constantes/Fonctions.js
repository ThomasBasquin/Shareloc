import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeJWTToken(value){
  try {
    await AsyncStorage.setItem('@token',JSON.stringify(value))
  } catch(e) {
    // read error
  }
  
}

export async function getJWTToken(){
  try {
    let token=await AsyncStorage.getItem('@token');
    return token!==null ? JSON.parse(token).token : null;
  } catch(e) {
    // read error
  }

 
}