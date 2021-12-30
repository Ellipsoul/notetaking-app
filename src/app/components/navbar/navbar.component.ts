import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth/';
import firebase from 'firebase/compat/app';

import { ThemeService } from '../../services/theme.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() themeEvent = new EventEmitter<string>();

  currentTheme:string;

  constructor(
    private themeService: ThemeService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toaster: ToastrService) {
    this.currentTheme = this.themeService.getTheme();
  }

  ngOnInit(): void {
  }

  toggleTheme():void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme();
    this.themeEvent.emit(this.currentTheme);
  }

  signInWithGoogle() {
    // Create a google authentication sign in with popup
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider)
        .then(() => {
          this.router.navigate(['/dashboard']);
          this.toaster.success('Signed In!', 'Success');
        })
        .catch((error) => {
          this.toaster.error('Failed to sign in!', 'Error');
          console.log(error);
        });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.toaster.info('Signed Out!', 'Info');
    }).catch((error) => {
      this.toaster.error('Failed to sign out!', 'Error');
      console.log(error);
    });
  }

  // Toasts user if they are not logged in
  async checkAuthentication():Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user === null) {
      this.toaster.error('You must be logged in to view your notes', 'Oops!');
    }
  }
}
