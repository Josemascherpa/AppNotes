// export const sleep = async()=>{
//   return new Promise(resolve=>setTimeout(resolve,2000));
// }

import { notesApi } from '../config/notesApi';
import { UserLogin } from '../domain/user';

interface ResponseData{
  auth:boolean;
  token:string;
  name:string;
  id:string;
}

export const verifyLogin = async ( userLogin:UserLogin ):Promise<ResponseData> => {
  try {
    // await sleep();    
    const url = "/signin";
    
    const { data } = await notesApi.post<ResponseData>( url, userLogin );    
    
    
    return data;

  } catch ( error:any ) {    
    if ( error.response.data.errors ) {
      const errorMessages = error.response.data.errors
        .map( ( err: { msg: string; } ) => err.msg )
        .join( ", " );
      throw new Error( errorMessages );
    }
    throw new Error( error.response.data.message || "Wrong email or password" );

  }

};