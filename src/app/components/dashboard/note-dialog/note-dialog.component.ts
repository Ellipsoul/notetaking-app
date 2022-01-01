import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note, NoteService, Tag } from '../../../services/note.service';
import { getFirestore, getDocs, collection, Firestore,
  doc, setDoc, Timestamp, DocumentData, DocumentReference } from 'firebase/firestore';
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
      title: '',
      description: '',
      content: '',
      tag: '',
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
      const docRef:DocumentReference<DocumentData> =
        doc(this.firestore, 'users', this.user.uid, 'notes', createdAtString);
      const data: Note = {
        title: this.currentNote.title,
        description: this.currentNote.description,
        content: this.currentNote.content,
        tag: Tag.General,
        favorite: false,
        createdAt: this.currentNote.createdAt,
        lastModified: Timestamp.now(),
      };

      setDoc(docRef, data).then(() => {
        this.toaster.success('Note updated!', 'Success');
        this.noteService.updateNote(this.currentNote);
        this.dialogRef.close();
      }).catch((error) => {
        this.toaster.error(error.message, 'Error');
        console.log(error);
      });
    } else {
      // Creating new note
      const timeNow: Timestamp = Timestamp.now();
      const createdAtString: string = this.noteService.convertToMillis(timeNow);
      const docRef:DocumentReference<DocumentData> =
        doc(this.firestore, 'users', this.user.uid, 'notes', createdAtString);
      this.noteService.appendNote(this.currentNote);
      const data: Note = {
        title: this.currentNote.title,
        description: this.currentNote.description,
        content: this.currentNote.content,
        tag: Tag.General,
        favorite: false,
        createdAt: timeNow,
        lastModified: Timestamp.now(),
      };

      setDoc(docRef, data).then(() => {
        this.toaster.success('Note created!', 'Success');
        this.noteService.appendNote(this.currentNote);
        this.dialogRef.close();
      }).catch((error) => {
        this.toaster.error(error.message, 'Error');
        console.log(error);
      });
    }
  }

  deleteNote(): void {
    // const createdAtString: string = this.noteService.convertToMillis(this.currentNote.createdAt)
  }
}
