import uuid from 'react-native-uuid';

export interface Note {
  id: string;
  title: string;
  content: string;
}

let notes: Note[] = [];

export const getNotes = (): Note[] => {
  return notes;
};

export const addNote = (title: string, content: string): Note => {
  const newNote = { id: uuid.v4().toString(), title, content };
  notes.push(newNote);
  return newNote;
};

export const removeNote = (id: string): void => {
  notes = notes.filter(note => note.id !== id);
};

export const findNoteById = (id: string): Note | undefined => {
  return notes.find(note => note.id === id);
};

export const getLastNote = (): Note | undefined => {
  return notes[notes.length - 1]; // Devuelve la última nota o undefined si el arreglo está vacío
};


export const updateNoteContent = (id: string, updatedContent: string): void => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {    
    notes[noteIndex].content = updatedContent;
  }
};

export const updateNoteTitle = (id: string, title: string): void => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {    
    notes[noteIndex].title = title;
  }
};

