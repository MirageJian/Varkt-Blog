import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SharedModule} from "../../shared/shared.module";
import {DashboardService} from "./dashboard.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }])
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
