import { NgModule } from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {AboutComponent} from "./about.component";
import {AboutService} from "./about.service";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AboutComponent, resolve: {data: AboutService}}])
  ],
  declarations: [AboutComponent],
  providers: [AboutService]
})
export class AboutModule { }
