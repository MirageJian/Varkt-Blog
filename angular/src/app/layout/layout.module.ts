import {NgModule} from '@angular/core';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./footer/footer.component";
import {SharedModule} from "@shared/shared.module";
import {LoadingComponent} from './loadding/loading.component';
import {BaseService} from "./services/base.service";
import {LoginService} from "./services/login.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    LoginService
  ]
})
export class LayoutModule {}
