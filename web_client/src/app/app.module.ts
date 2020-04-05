import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AppServicesModule} from "@app-services/app-services.module";
import {ErrorPageComponent} from "./error-page/error-page.component";
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Serivce
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: '_xsrf', // Define your title of xsrf param
      headerName: 'X-XSRFToken',
    }),
    AppRoutingModule, // The root module should always be the last one
    AppServicesModule, // Common and general service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
