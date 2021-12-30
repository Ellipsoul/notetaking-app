import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
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
    private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
      this.toaster.info('Signed Out!', '', {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
      });
    });
  }
}
