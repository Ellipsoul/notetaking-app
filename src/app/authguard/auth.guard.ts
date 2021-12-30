import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private snackbar: MatSnackBar) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean | UrlTree> {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;

    if (!isAuthenticated) {
      this.snackbar.open('Please sign in to view your notes!', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
    return isAuthenticated;
  }
}
