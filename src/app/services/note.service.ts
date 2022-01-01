import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

export enum Tag {
  General = 'General',
  Personal = 'Personal',
  Work = 'Work',
  Other = 'Other',
}

export interface Note {
  title: string;
  description: string;
  content: string;
  tag: string;
  favorite: boolean;
  createdAt: Timestamp;
  lastModified: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: BehaviorSubject<Note[]>;

  constructor() {
    this.notes = new BehaviorSubject<Note[]>([]);
  }

  // Set the notes
  setNotes(notes: Note[]): void {
    this.notes.next(notes)
  }

  // Append a note
  appendNote(note: Note): void {
    const notes = this.notes.getValue();
    notes.push(note);
    this.notes.next(notes);
  }

  // Get the notes
  getNotes(): Note[] {
    return this.notes.getValue();
  }

  // Clear all notes
  clearNotes(): void {
    this.notes.next([]);
  }

  // Update a note, find it by createdAt timestamp
  updateNote(note: Note): void {
    const notes = this.notes.getValue();
    const index = notes.findIndex((n) =>
      this.convertToMillis(n.createdAt) === this.convertToMillis(note.createdAt)
    );
    notes[index] = note;
    this.notes.next(notes);
  }

  // Remove a note, find it by createdAt timestamp
  removeNoteByTimestamp(timestamp: Timestamp): void {
    const notes = this.getNotes();
    const index = notes.findIndex((n) =>
      this.convertToMillis(n.createdAt) === this.convertToMillis(timestamp)
    );
    notes.splice(index, 1);
    this.notes.next(notes);
  }

  // Manual conversion to milliseconds
  convertToMillis(timestamp: Timestamp): string {
    return timestamp.seconds.toString() + timestamp.nanoseconds.toString().slice(0, 3);
  }
}
