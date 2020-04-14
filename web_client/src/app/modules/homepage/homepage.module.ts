import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomepageComponent} from "./homepage.component";
import {SharedModule} from "@shared/shared.module";
import {HomepageService} from "./homepage.service";
import {SomethingService} from "../something/something.service";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: HomepageComponent, resolve: {data: HomepageService}}])
  ],
  declarations: [HomepageComponent],
  providers: [HomepageService, SomethingService]
})
export class HomepageModule { }
