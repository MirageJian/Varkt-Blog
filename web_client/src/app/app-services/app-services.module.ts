import { NgModule } from '@angular/core';
import {BaseService} from "./base.service";
import {LoginService} from "./login.service";
import {ToolsService} from "./tools.service";

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    BaseService,
    LoginService,
    // HttpInterceptorProviders
    ToolsService
  ]
})
export class AppServicesModule { }
