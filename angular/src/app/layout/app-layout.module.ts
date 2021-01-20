import {NgModule} from '@angular/core';
import {AppLayoutRouting} from './app-layout-routing.module';
import {AppLayoutComponent} from './app-layout.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '@shared/shared.module';
import {LoadingComponent} from './loadding/loading.component';
import {BaseService} from './services/base.service';
import {LoginService} from './services/login.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppLayoutRouting,
    SharedModule,
    // MatButtonModule,
    // MatMenuModule,
    // MatIconModule,
    // MatToolbarModule,
  ],
  declarations: [
    AppLayoutComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
  ],
  exports: [
    AppLayoutComponent
  ],
  providers: [
    BaseService,
    LoginService
  ]
})
export class AppLayoutModule {}
