// export const sleep = async()=>{
//   return new Promise(resolve=>setTimeout(resolve,2000));
// }

import { notesApi } from '../config/notesApi';
import { User } from '../domain/user';

interface Props {
  user: User;
}

export const verifyRegister = async ( { user }: Props ) => {

  try {
    // await sleep();    
    const url = "/register";
    
    const { data } = await notesApi.post( url, user );    
    
    return data;

  } catch ( error ) {    
    throw new Error( "Error registrando el usuario" );

  }

};