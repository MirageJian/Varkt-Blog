import { NgModule } from '@angular/core';
import {BaseService} from "./base.service";
import {LoginService} from "./login.service";
import {HttpInterceptorProviders} from "./http-interceptors";

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    BaseService,
    LoginService,
    // HttpInterceptorProviders
  ]
})
export class AppServicesModule { }
