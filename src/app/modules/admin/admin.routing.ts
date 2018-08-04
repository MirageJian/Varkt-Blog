import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';
import { ManagingComponent } from './managing/managing.component';
import { WritingComponent } from './writing/writing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {SettingComponent} from "./setting/setting.component";
import { WorkbookComponent } from './workbook/workbook.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent},
      { path: 'managing', component: ManagingComponent },
      { path: 'writing', component: WritingComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'workbook', component: WorkbookComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
