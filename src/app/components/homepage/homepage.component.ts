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

  ngOnInit(): void {}

  signInWithGoogle() {
    // Create a google authentication sign in with popup
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider)
        .then(() => {
          this.router.navigate(['/dashboard']);
          this.toaster.success('Signed In!', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
            progressBar: true,
          });
        })
        .catch((error) => {
          this.toaster.error('Failed to sign in!', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
            progressBar: true,
          });
          console.log(error);
        });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.toaster.success('Signed Out!', '', {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
      });
    }).catch((error) => {
      this.toaster.error('Failed to sign out!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
      });
      console.log(error);
    });
  }
}
