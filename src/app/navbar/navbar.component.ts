import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() themeEvent = new EventEmitter<string>();

  currentTheme:string;

  constructor(private themeService: ThemeService, public afAuth: AngularFireAuth) {
    this.currentTheme = this.themeService.getTheme();
  }

  toggleTheme():void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme();
    this.themeEvent.emit(this.currentTheme);
  }


  ngOnInit(): void {
  }

  signIn() {
    // Create a google authentication sign in with popup
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
  }

  signOut() {
    this.afAuth.signOut();
  }
}
