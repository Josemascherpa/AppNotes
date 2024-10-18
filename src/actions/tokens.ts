import AsyncStorage from '@react-native-async-storage/async-storage';
import { notesApi } from '../config/notesApi';
import { Alert } from 'react-native';


export const verifyToken = async () => {
  try {    
    const token = await AsyncStorage.getItem( 'userToken' );    
    if ( token === null ) {
      Alert.alert( "Error", "Token is not valid or not present." );
      throw new Error( "Token is not valid or not present." );
    }
    const url = "/verifyToken";

    // mando el token como config en el header
    const config = {
      headers: {
        'x-access-token': token,
      }
    };
    const { data } = await notesApi.post( url, {}, config );
    return data;
  } catch ( error: any ) {
    throw new Error( "No valid token" );
  }

};