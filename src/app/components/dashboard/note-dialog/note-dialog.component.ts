import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note, NoteService, Tag } from '../../../services/note.service';
import { getFirestore, deleteDoc, Firestore, doc,
  setDoc, Timestamp, DocumentData, DocumentReference } from 'firebase/firestore';
import { ThemeService } from 'src/app/services/theme.service';
import { ToastrService } from 'ngx-toastr';
import { getAuth, User } from 'firebase/auth';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css'],
})
export class NoteDialogComponent implements OnInit {
  currentNote: Note;
  user!: User;
  firestore!: Firestore;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Note | null,
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    private themeService: ThemeService,
    private toaster: ToastrService,
    private noteService: NoteService,) {
    const tempTimestamp = Timestamp.now();
    // Create a deep copy to prevent mutation of original note
    this.currentNote = data ? JSON.parse(JSON.stringify(data)) : {
      title: 'Placeholder Title',
      description: 'Placeholder Description',
      content: 'Placeholder Content',
      tag: 'General',
      favorite: false,
      createdAt: tempTimestamp,
      lastModified: tempTimestamp,
    };

    // Get the currently authenticated user
    const auth = getAuth();
    this.user = auth.currentUser!;
    // Retrieve an instance of firestore
    this.firestore = getFirestore();
  }

  ngOnInit(): void {}

  // Required to theme internal elements
  applyTheme(): string {
    return this.themeService.getTheme();
  }

  // Insert or update a note to Firebase
  upsertNote(): void {
    // Ensure at least title is provided
    if (this.currentNote.title === '') {
      this.toaster.error('Title cannot be empty', 'Error');
      return
    }

    // Update note if it already exists, otherwise create a new note
    if (this.data) {
      // Updating existing note
      const createdAtString: string = this.noteService.convertToMillis(this.currentNote.createdAt)
      // Retrieve the document reference
      const docRef:DocumentReference<DocumentData> =
        doc(this.firestore, 'users', this.user.uid, 'notes', createdAtString);
      // Gather the note data
      const data: Note = {
        title: this.currentNote.title,
        description: this.currentNote.description,
        content: this.currentNote.content,
        tag: this.currentNote.tag,
        favorite: false,
        createdAt: this.currentNote.createdAt,
        lastModified: Timestamp.now(),
      };
      // Update the existing note
      setDoc(docRef, data).then(() => {
        this.toaster.success('Note updated!', 'Success');
        this.noteService.updateNote(data);
        // Sort the notes once database is updated
        this.noteService.sortNotesBySortType(localStorage.getItem('sort'));
        this.dialogRef.close();
      }).catch((error) => {
        this.toaster.error(error.message, 'Error');
        console.log(error);
      });
    } else {
      // Creating new note
      // Retrieve the document reference and current time
      const timeNow: Timestamp = Timestamp.now();
      const createdAtString: string = this.noteService.convertToMillis(timeNow);
      const docRef:DocumentReference<DocumentData> =
        doc(this.firestore, 'users', this.user.uid, 'notes', createdAtString);
      // Gather the note data
      const data: Note = {
        title: this.currentNote.title,
        description: this.currentNote.description,
        content: this.currentNote.content,
        tag: this.currentNote.tag,
        favorite: false,
        createdAt: timeNow,
        lastModified: timeNow,
      };
      // Create the note and add it to firebase
      setDoc(docRef, data).then(() => {
        this.toaster.success('Note created!', 'Success');
        this.noteService.appendNote(data);
        // Sort the notes once database is updated
        this.noteService.sortNotesBySortType(localStorage.getItem('sort'));
        this.dialogRef.close();
      }).catch((error) => {
        this.toaster.error(error.message, 'Error');
        console.log(error);
      });
    }
  }

  // Delete a note from Firebase
  deleteNote(): void {
    const createdAtString: string = this.noteService.convertToMillis(this.currentNote.createdAt);
    const docRef: DocumentReference<DocumentData> =
      doc(this.firestore, 'users', this.user.uid, 'notes', createdAtString);

    deleteDoc(docRef).then(() => {
      this.toaster.success('Note deleted!', 'Success');
      this.noteService.removeNoteByTimestamp(this.currentNote.createdAt);
      this.dialogRef.close();
    }).catch((error) => {
      this.toaster.error(error.message, 'Error');
      console.log(error);
    });
  }

  updateTag(tag: string): void {
    this.currentNote.tag = tag;
  }
}
