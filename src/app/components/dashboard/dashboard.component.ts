import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, getDocs, collection, Firestore, CollectionReference,
  DocumentData } from '@angular/fire/firestore';
import { getAuth, User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Note, NoteService } from '../../services/note.service';

import { ThemeService } from 'src/app/services/theme.service';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Non-null assertion since route is protected by auth guard
  user!: User;
  firestore!: Firestore;
  notes: Note[];

  constructor(
    public afAuth: AngularFireAuth,
    private toaster: ToastrService,
    private themeService: ThemeService,
    public dialog: MatDialog,
    public noteService: NoteService,
  ) {
    this.notes = this.noteService.getNotes();
  }

  // Retrieve authenticated user object and initliase firestore
  ngOnInit(): void {
    // Prevent the notes from loading twice on page route change
    if (this.noteService.getLength() !== 0) return;

    // Get the currently authenticated user
    const auth = getAuth();
    this.user = auth.currentUser!;
    // Retrieve an instance of firestore
    this.firestore = getFirestore();

    // Retrieve notes collection for the current user
    const notesCollectionRef: CollectionReference<DocumentData> =
      collection(this.firestore, 'users', this.user.uid, 'notes');
    // Retrieve all notes for the current user
    const notesSnapshot = getDocs(notesCollectionRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        // Append to the notes in the service
        this.noteService.appendNote(doc.data() as Note);
      });
      // Get the sorting method from local storage
      const sortMethod: string | null = localStorage.getItem('sort');
      this.noteService.sortNotesBySortType(sortMethod);
    }).catch((error) => {
      this.toaster.error('Failed to retrieve notes', 'Error');
      console.log(error)
    });
  }

  // Opens the new note dialog
  openDialog(note: Note | null = null): void {
    // Open dialog and pass in the note if present
    const dialogRef = this.dialog.open(
      NoteDialogComponent,
      {
        data: note,
        panelClass: this.applyTheme() === 'light' ? 'light-dialog' : 'dark-dialog',
        height: '80vh',
        width: '80vw' },
    );

    // Tracks the dialog result when it is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed with result: ${result}`);
    });
  }

  // For some reason Angular lost track of the theme from further up
  applyTheme(): string {
    return this.themeService.getTheme();
  }
}
