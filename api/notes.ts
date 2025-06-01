import instance from ".";
import { NoteType } from "../types/NoteType";

// ✅ Get all notes
const getAllNotes = async (): Promise<NoteType[]> => {
  const { data } = await instance.get("/notes");
  return data;
};

// ✅ Get one note by ID
const getNote = async (noteId: string): Promise<NoteType> => {
  const { data } = await instance.get(`/notes/${noteId}`);
  return data;
};

// ✅ Create a new note
const createNote = async (noteInfo: NoteType): Promise<NoteType> => {
  const { data } = await instance.post("/notes", noteInfo);
  return data;
};

// ✅ Update an existing note
const updateNote = async (noteInfo: NoteType): Promise<NoteType> => {
  const { data } = await instance.put(`/notes/${noteInfo._id}`, noteInfo);
  return data;
};

// ✅ Delete a note by ID
const deleteNote = async (noteId: string): Promise<{ message: string }> => {
  const { data } = await instance.delete(`/notes/${noteId}`);
  return data;
};

export { getAllNotes, getNote, createNote, updateNote, deleteNote };
