
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notesApi } from '../config/notesApi';
import { Alert } from 'react-native';


export interface Note {
  _id: string;
  title: string;
  content: string;
  date: Date;
}

// const url = "/notes";   

export const addNote = async ( userId: string, title: string, content: string ) => {
  try {
    const action = "/notes/addNote";
    const token = await AsyncStorage.getItem( 'userToken' );
    const { data } = await notesApi.post(
      action,
      { userId, title, content }, // Body de la solicitud
      {
        headers: {
          'x-access-token': token, // Incluir el token en el header
        },
      }
    );
    return data;
  } catch ( error: any ) {
    Alert.alert( error.response.data.message || "error add note" );
    throw new Error( error.response.data.message || "error add note" );
  }
};

export const getNotes = async ( userId: string ): Promise<Note[]> => {
  try {
    const url = `/notes/getNotes`;
    const token = await AsyncStorage.getItem( 'userToken' );
    const { data } = await notesApi.get(
      url,
      {
        headers: {
          'x-access-token': token,
          'user-id': userId,
        },
      }
    );
    return data.notes;
  } catch ( error: any ) {
    Alert.alert( error.response.data.message || "error get note front" );
    throw new Error( error.response.data.message || "error get note front" );
  }
};

export const removeNote = async ( userId: string, noteId: string ) => {
  try {
    const url = `/notes/removeNote`;

    const token = await AsyncStorage.getItem( 'userToken' );
    const { data } = await notesApi.post(
      url,
      {
        userId,  // Asegúrate de enviar el userId y noteId en el body
        noteId,
      },
      {
        headers: {
          'x-access-token': token,  // El token se envía como header
        },
      }
    );
    // Alert.alert( "nota eliminindaa" );
  } catch ( error: any ) {
    // Alert.alert( error.response.data.message || "no se pudo eliminar la nota front" );
    throw new Error( error.response.data.message || "no se pudo eliminar la nota front" );
  }

};


export const updateNote = async ( userId: string, noteId: string, title: string, content: string ) => {
  try {
    const url = `/notes/updateNote`;

    const token = await AsyncStorage.getItem( 'userToken' );
    const { data } = await notesApi.post(
      url,
      {
        userId,  // Asegúrate de enviar el userId y noteId en el body
        noteId,
        title,
        content,
      },
      {
        headers: {
          'x-access-token': token,  // El token se envía como header
        },
      }
    );
  } catch ( error: any ) {
    // throw new Error( error.response.data.message || "no se pudo actualizar la nota front" );
  }

}

