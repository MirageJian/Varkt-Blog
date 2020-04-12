import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';
import { ManagingComponent } from './managing/managing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {SettingsComponent} from "./settings/settings.component";
import {AboutManagingComponent} from "./about-managing/about-managing.component";
import {PublicFilesComponent} from "./public-files/public-files.component";
import {GoMarkdownComponent} from "./go-markdown/go-markdown.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AdminGuard],// canActivateChild: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent},
      { path: 'managing', component: ManagingComponent },
      { path: 'go-markdown', component: GoMarkdownComponent },
      { path: 'about-managing', component: AboutManagingComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'public-files', component: PublicFilesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
