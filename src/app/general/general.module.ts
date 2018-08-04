import { NgModule } from '@angular/core';
import { GeneralRoutingModule } from './general.routing';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorisationComponent } from './authorisation/authorisation.component';

import { AuthorisationService } from './authorisation/authorisation.service';
import {GeneralService} from "./general.service";

@NgModule({
  imports: [
    SharedModule,
    GeneralRoutingModule
  ],
  declarations: [
    AboutComponent,
    DashboardComponent,
    AuthorisationComponent,
  ],
  providers: [
    AuthorisationService,
    GeneralService,
  ]
})
export class GeneralModule { }
