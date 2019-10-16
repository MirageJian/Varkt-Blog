import {NgModule} from '@angular/core';

import {AdminGuard} from './admin-guard.service';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {ManagingComponent} from './managing/managing.component';
import {WritingComponent} from './writing/writing.component';
import {SharedModule} from '../../shared/shared.module';
import {WorkbookModule} from './workbook/workbook.module';
import {WritingService} from './writing/writing.service';
import {ManagingService} from './managing/managing.service';
import {AdminDashboardService} from "./admin-dashboard/admin-dashboard.service";
import { SettingsComponent } from './settings/settings.component';
import { PoYoungComponent } from './po-young/po-young.component';
import { PasswordComponent } from './settings/password/password.component';
import { CategoriesManagingComponent } from './settings/categories-managing/categories-managing.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    WorkbookModule,
  ],
  declarations: [
    AdminComponent,
    ManagingComponent,
    WritingComponent,
    SettingsComponent,
    PoYoungComponent,
    PasswordComponent,
    CategoriesManagingComponent,
  ],
  entryComponents: [],
  providers: [
    AdminGuard,
    WritingService,
    ManagingService,
    AdminDashboardService,
  ],
})
export class AdminModule {
}
