// This home-made auth guard is no longer in use

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,
  RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private toaster: ToastrService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean | UrlTree> {
    // Retrieve the current user from firebase
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;

    // If the user is not authenticated, they cannot access the route
    if (!isAuthenticated) {
      this.toaster.error('You must be logged in to view your notes', 'Oops!');
    }
    return isAuthenticated;
  }
}
