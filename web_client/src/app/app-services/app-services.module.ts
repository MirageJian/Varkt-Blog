import { NgModule } from '@angular/core';
import {BaseService} from "./base.service";
import {LoginService} from "./login.service";
import {FileUploadService} from "@app-services/file-upload.service";

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    BaseService,
    LoginService,
    // HttpInterceptorProviders
    FileUploadService
  ]
})
export class AppServicesModule { }
