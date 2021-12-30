import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private toaster: ToastrService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean | UrlTree> {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;

    if (!isAuthenticated) {
      this.toaster.error('You must be logged in to view your notes', 'Oops!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',
        progressBar: true,
      });
    }
    return isAuthenticated;
  }
}
