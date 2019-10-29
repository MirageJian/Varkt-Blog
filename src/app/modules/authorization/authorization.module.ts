import { NgModule } from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {AuthorizationService} from "./authorization.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthorizationComponent }])
  ],
  declarations: [AuthorizationComponent],
  providers: [AuthorizationService]
})
export class AuthorizationModule { }
