import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { BaseService } from './base.service';
import { LoginService } from './login/login.service';
import { HttpInterceptorProviders } from './shared/http-interceptors';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogDataExampleDialogComponent} from "./shared/components/alert-dialog/alert-dialog.component";
import {CommonModule} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    // basic component
    NavbarComponent,
    LoginComponent,
    DialogDataExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: '_xsrf', // define your title of xsrf param
      headerName: 'X-XSRFToken',
    }),
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,

    AppRoutingModule, // the root module should always be the last one
  ],
  providers: [
    BaseService,
    LoginService,
    HttpInterceptorProviders
  ],
  entryComponents: [
    DialogDataExampleDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
