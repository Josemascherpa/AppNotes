import { Note } from '../context/notesStore';


export interface User{
  name:string;
  email:string;
  password:string;
  notes:Note[];
}

export interface UserLogin{
  email:string;
  password:string;
  
}