import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
      this.snackBar.open('Signed out!', 'Dismiss', {
        duration: 3000,
      });
    });
  }
}
