import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisationComponent } from './authorisation/authorisation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '', component: DashboardComponent },
  { path: 'authorisation', component: AuthorisationComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule { }
