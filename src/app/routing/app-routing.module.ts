import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

import { HomepageComponent } from '../components/homepage/homepage.component';
import { AboutComponent } from '../components/about/about.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
