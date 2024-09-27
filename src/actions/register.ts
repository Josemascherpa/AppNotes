// export const sleep = async()=>{
//   return new Promise(resolve=>setTimeout(resolve,2000));
// }

import axios from 'axios';
import { notesApi } from '../config/notesApi';
import { User } from '../domain/user';

interface ResponseData {
  auth: boolean;
  token: string;
}


export const verifyRegister = async ( user: User ): Promise<ResponseData> => {
  try {
    const url = "/register";
    const { data } = await notesApi.post<ResponseData>( url, user );
    return data;
  } catch ( error: any ) {

    //muestro los errores queddevuelvo del backend en un array de errores
    if ( error.response.data.errors ) {
      const errorMessages = error.response.data.errors
        .map( ( err: { msg: string; } ) => err.msg )
        .join( ", " );
      throw new Error( errorMessages );
    }
    throw new Error( error.response.data.message || "Error registering user" );
  }
};