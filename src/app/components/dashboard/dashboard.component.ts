import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, getDocs, collection, Firestore } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { ToastrService } from 'ngx-toastr';

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
}
