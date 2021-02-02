import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {AppLayoutRouting} from './app-layout-routing.module';
import {AppLayoutComponent} from './app-layout.component';
import {FooterComponent} from './footer/footer.component';
import {LoadingFloatComponent} from './loadding-float/loading-float.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BaseService} from './services/base.service';
import {LoginService} from './services/login.service';

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
  declarations: [AppLayoutComponent, NavbarComponent, FooterComponent, LoadingFloatComponent],
  exports: [AppLayoutComponent],
  providers: [BaseService, LoginService],
})
export class AppLayoutModule {}
