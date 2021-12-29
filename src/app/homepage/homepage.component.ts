import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  signInWithGoogle() {
    // Create a google authentication sign in with popup
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider)
        .then(() => {
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Signed in!', 'Dismiss', {
            duration: 3000,
          });
        })
        .catch((error) => {
          this.snackBar.open('Sign in failed!', 'Dismiss', {
            duration: 3000,
          });
        });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('Signed out!', 'Dismiss', {
        duration: 3000,
      });
    });
  }
}
