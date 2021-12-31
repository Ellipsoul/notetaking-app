import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, getDocs, collection, Firestore,
  doc, setDoc, Timestamp } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { ToastrService } from 'ngx-toastr';
import { lorem } from 'faker';

enum Tag {
  General = 'General',
  Personal = 'Personal',
  Work = 'Work',
  Other = 'Other',
}
interface Note {
  title: string;
  subtitle: string;
  content: string;
  tag: string;
  favorite: boolean;
  createdAt: Timestamp;
  lastModified: Timestamp;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Non-null assertion since route is protected by auth guard
  user!: firebase.User;
  firestore!: Firestore;

  constructor(
    public afAuth: AngularFireAuth,
    private toaster: ToastrService) {
  }

  // Retrieve authenticated user object and initliase firestore
  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      this.user = user!;
    });
    this.firestore = getFirestore();
  }

  async clicked(): Promise<void> {
    console.log(this.user);
    console.log(this.user.uid);

    // This will retrieve the notes collection for the current user
    const collectionRef:any = collection(this.firestore, 'users', this.user.uid, 'notes');
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  }

  async addNote(): Promise<void> {
    const timestamp = Timestamp.now();
    const timestampString = timestamp.toMillis().toString();

    const docRef:any = doc(this.firestore, 'users', this.user.uid, 'notes', timestampString);

    const data: Note = {
      title: lorem.words(2),
      subtitle: lorem.words(5),
      content: lorem.sentences(1),
      tag: Tag.General,
      favorite: false,
      createdAt: timestamp,
      lastModified: timestamp,
    };

    await setDoc(docRef, data);
    this.toaster.success('Note added');
  }
}
