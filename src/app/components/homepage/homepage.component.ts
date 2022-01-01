import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
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
    private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  signInWithGoogle(): void {
    // Create a google authentication sign in with popup
    const googleAuthProvider: firebase.auth.GoogleAuthProvider =
      new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider)
        .then(() => {
          this.router.navigate(['/dashboard']);
          this.toaster.success('Welcome', 'Signed In!');
        })
        .catch((error) => {
          this.toaster.error('Failed to sign in!', 'Error');
          console.log(error);
        });
  }

  signOut(): void {
    this.afAuth.signOut().then(() => {
      this.toaster.info('See you next time', 'Signed Out!');
    }).catch((error) => {
      this.toaster.error('Failed to sign out!', 'Error');
      console.log(error);
    });
  }
}
