// export const sleep = async()=>{
//   return new Promise(resolve=>setTimeout(resolve,2000));
// }

import { notesApi } from '../config/notesApi';
import { UserLogin } from '../domain/user';

interface ResponseData{
  auth:boolean;
  token:string;
}

export const verifyLogin = async ( userLogin:UserLogin ):Promise<ResponseData> => {
  try {
    // await sleep();    
    const url = "/signin";
    
    const { data } = await notesApi.post<ResponseData>( url, userLogin );    
    
    
    return data;

  } catch ( error ) {    
    throw new Error( "Error logueando el usuario" );

  }

};