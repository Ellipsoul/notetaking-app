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
  // Passes theme to parent component
  @Output() themeEvent = new EventEmitter<string>();
  currentTheme: string;

  constructor(
    private themeService: ThemeService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toaster: ToastrService) {
    this.currentTheme = this.themeService.getTheme();
  }

  ngOnInit(): void {}

  // Toggles the theme and informs parent component
  toggleTheme():void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme();
    this.themeEvent.emit(this.currentTheme);
  }

  // Signs in with Google using a popup
  signInWithGoogle(): void {
    const googleAuthProvider: firebase.auth.GoogleAuthProvider =
      new firebase.auth.GoogleAuthProvider();
    // Attempt to sign in, and catch any errors
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

  // Sign out and redirect to home page
  signOut(): void {
    this.afAuth.signOut().then(() => {
      this.toaster.info('Signed Out!', 'Info');
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.toaster.error('Failed to sign out!', 'Error');
      console.log(error);
    });
  }

  // Runs when user attempts to access the dashboard
  async checkAuthentication():Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user === null) {
      this.toaster.error('You must be logged in to view your notes', 'Oops!');
    }
  }
}
