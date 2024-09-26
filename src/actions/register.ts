// export const sleep = async()=>{
//   return new Promise(resolve=>setTimeout(resolve,2000));
// }

import { notesApi } from '../config/notesApi';
import { User } from '../domain/user';

interface ResponseData{
  auth:boolean;
  token:string;
}


export const verifyRegister = async ( user:User ):Promise<ResponseData> => {

  try {
    // await sleep();    
    const url = "/register";
    
    const { data } = await notesApi.post<ResponseData>( url, user );    
    
    console.log(data);
    return data;

  } catch ( error ) {    
    throw new Error( "Error registrando el usuario" );

  }

};