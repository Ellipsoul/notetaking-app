import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authguard/auth.guard';

import { HomepageComponent } from '../components/homepage/homepage.component';
import { AboutComponent } from '../components/about/about.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
