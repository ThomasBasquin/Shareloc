
export async function storeJWTToken(value){
  try {
    await localStorage.setItem('@token',JSON.stringify(value))
  } catch(e) {
    // read error
  }
  console.log('Done.')
}

export async function getJWTToken(){
  try {
    let token=await localStorage.getItem('@token');
    return token!==null ? JSON.parse(token).token : null;
  } catch(e) {
    // read error
  }

  console.log('Done.')
}