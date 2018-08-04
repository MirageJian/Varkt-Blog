import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {AboutService} from "./about.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AboutComponent }])
  ],
  declarations: [AboutComponent],
  providers: [AboutService]
})
export class AboutModule { }
