import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthorisationComponent} from "./authorisation/authorisation.component";
import {AuthorisationService} from "./authorisation.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthorisationComponent }])
  ],
  declarations: [AuthorisationComponent],
  providers: [AuthorisationService]
})
export class AuthorisationModule { }
