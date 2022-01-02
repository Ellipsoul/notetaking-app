import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

export enum Tag {
  General = 'General',
  Personal = 'Personal',
  Work = 'Work',
  Leisure = 'Leisure',
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

  // Sort the notes array by createdAt timestamp
  sortNotesByCreatedAt(): void {
    const notes = this.notes.getValue();
    notes.sort((a, b) => {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
    // Save the sort format in local storage
    localStorage.setItem('sort', 'createdAt');
    this.notes.next(notes);
  }

  // Sort the notes array by title
  sortNotesByTitle(): void {
    const notes = this.notes.getValue();
    notes.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    // Save the sort format in local storage
    localStorage.setItem('sort', 'title');
    this.notes.next(notes);
  }

  // Sort the notes array by lastModified timestamp
  sortNotesByLastModified(): void {
    const notes = this.notes.getValue();
    notes.sort((a, b) => {
      return b.lastModified.seconds - a.lastModified.seconds;
    });
    // Save the sort format in local storage
    localStorage.setItem('sort', 'lastModified');
    this.notes.next(notes);
  }

  // Sort the notes array by tag
  sortNotesByTag(): void {
    const notes = this.notes.getValue();
    notes.sort((a, b) => {
      return a.tag.localeCompare(b.tag);
    });
    // Save the sort format in local storage
    localStorage.setItem('sort', 'tag');
    this.notes.next(notes);
  }

  // Sort the notes array by the sort format in local storage
  sortNotesBySortType(sortType: string | null): void {
    switch (sortType) {
      case 'createdAt':
        this.sortNotesByCreatedAt();
        break;
      case 'title':
        this.sortNotesByTitle();
        break;
      case 'lastModified':
        this.sortNotesByLastModified();
        break;
      case 'tag':
        this.sortNotesByTag();
        break;
      default:
        this.sortNotesByCreatedAt();
        localStorage.setItem('sort', 'createdAt');
        break;
    }
  }

  // Manual conversion to milliseconds
  convertToMillis(timestamp: Timestamp): string {
    return timestamp.seconds.toString() + timestamp.nanoseconds.toString().slice(0, 3);
  }

  // Return length of notes
  getLength(): number {
    return this.notes.getValue().length;
  }
}
