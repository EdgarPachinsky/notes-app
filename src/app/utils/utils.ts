import {INote} from "../models/note.model";

function getNotesFromLocalStorage(): INote[] {
  const notes = localStorage.getItem('noteNest');
  return notes ? JSON.parse(notes) : [];
}
// Helper function to save notes to local storage
function saveNotesToLocalStorage(notes: INote[]): void {
  localStorage.setItem('noteNest', JSON.stringify(notes));
}
// Function to get all notes
export function getAllNotes(isPinned: boolean = false): INote[] {
  let allNotes = getNotesFromLocalStorage();

  return allNotes.filter((note: INote) => note.isPinned === isPinned)
}

export // Function to add a new note
function addNote(title: string, description?: string, isPinned: boolean = false): INote {
  const notes = getNotesFromLocalStorage();

  const newNote: INote = {
    uniqueId: `note-${Date.now()}`, // Generate unique ID based on current timestamp
    title: title,
    description: description,
    isPinned: isPinned,
    order: notes.length // Set order as the last index in the array
  };

  notes.push(newNote);
  saveNotesToLocalStorage(notes);
  return newNote;
}
// Function to remove a note by uniqueId
export function removeNote(uniqueId: string): void {
  const notes = getNotesFromLocalStorage();
  const updatedNotes = notes.filter(note => note.uniqueId !== uniqueId);

  saveNotesToLocalStorage(updatedNotes);
}
// Function to edit an existing note
export function editNote(uniqueId: string, title: string, description?: string, isPinned?: boolean): INote | null {
  const notes = getNotesFromLocalStorage();
  const noteIndex = notes.findIndex(note => note.uniqueId === uniqueId);

  if (noteIndex !== -1) {
    // Update the note properties
    notes[noteIndex].title = title;

    // Only update description and isPinned if they are provided
    if (description !== undefined) {
      notes[noteIndex].description = description;
    }

    if (isPinned !== undefined) {
      notes[noteIndex].isPinned = isPinned;
    }

    // Save updated notes back to local storage
    saveNotesToLocalStorage(notes);

    // Return the updated note
    return notes[noteIndex];
  } else {
    // Note not found, return null
    return null;
  }
}
