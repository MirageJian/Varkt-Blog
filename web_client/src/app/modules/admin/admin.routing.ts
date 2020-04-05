import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';
import { ManagingComponent } from './managing/managing.component';
import { WritingComponent } from './writing/writing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {SettingsComponent} from "./settings/settings.component";
import { WorkbookComponent } from './workbook/workbook.component';
import {PoYoungComponent} from "./po-young/po-young.component";
import {AboutManagingComponent} from "./about-managing/about-managing.component";
import {PublicFilesComponent} from "./public-files/public-files.component";
import {MarkdownEditorComponent} from "./markdown-editor/markdown-editor.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AdminGuard],// canActivateChild: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent},
      { path: 'managing', component: ManagingComponent },
      { path: 'writing', component: WritingComponent },
      { path: 'markdown-editor', component: MarkdownEditorComponent },
      { path: 'about-managing', component: AboutManagingComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'public-files', component: PublicFilesComponent },
      { path: 'po-young', component: PoYoungComponent },
      { path: 'workbook', component: WorkbookComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
