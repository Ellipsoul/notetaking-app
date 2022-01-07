import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
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
    private toaster: ToastrService,
    private themeService: ThemeService) { }

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

  // Track the theme for homepage internal components
  applyTheme(): string {
    return this.themeService.getTheme();
  }
}
