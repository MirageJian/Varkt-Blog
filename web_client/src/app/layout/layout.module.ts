import {APP_INITIALIZER, NgModule} from '@angular/core';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./footer/footer.component";
import {SharedModule} from "@shared/shared.module";
import { LoadingComponent } from './loadding/loading.component';
import {BaseService} from "@app-services/base.service";
import {LoginService} from "@app-services/login.service";
import {FileUploadService} from "@app-services/file-upload.service";

@NgModule({
  imports: [
    CommonModule,
    LayoutRouting,

    SharedModule,
    // MatButtonModule,
    // MatMenuModule,
    // MatIconModule,
    // MatToolbarModule,
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
  ],
  providers: [
    BaseService,
    LoginService,
    // HttpInterceptorProviders
    FileUploadService
  ]
})
export class LayoutModule {}
