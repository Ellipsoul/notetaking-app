import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, getDocs, collection, Firestore,
  doc, setDoc, Timestamp, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { getAuth, User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Note, Tag } from '../../services/note.service';

import { lorem } from 'faker';

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
  notes: Note[] = [];

  constructor(
    public afAuth: AngularFireAuth,
    private toaster: ToastrService,
    private themeService: ThemeService,
    public dialog: MatDialog,
  ) { }

  // Retrieve authenticated user object and initliase firestore
  ngOnInit(): void {
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
        this.notes.push(doc.data() as Note);
      });
    });
  }

  // Temporary function to generate a random note
  async addNote(): Promise<void> {
    const timestamp = Timestamp.now();
    const timestampString = timestamp.toMillis().toString();

    const docRef:any = doc(this.firestore, 'users', this.user.uid, 'notes', timestampString);

    const data: Note = {
      title: lorem.words(2),
      description: lorem.words(5),
      content: lorem.sentences(1),
      tag: Tag.General,
      favorite: false,
      createdAt: timestamp,
      lastModified: timestamp,
    };

    await setDoc(docRef, data).then(() => {
      this.toaster.success('Note added', 'Success');
      this.notes.push(data);
    }).catch((error) => {
      this.toaster.error(error.message, 'Error');
    });
  }

  // Opens the new note dialog
  openDialog(note: Note | null = null): void {
    // Open dialog and pass in the note if present
    const dialogRef = this.dialog.open(
      NoteDialogComponent,
      { data: note, panelClass: this.applyTheme() === 'light' ? 'light-dialog' : 'dark-dialog', height: '80vh', width: '60vw' },
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
