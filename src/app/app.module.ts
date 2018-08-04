import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AppServicesModule} from "./app-services/app-services.module";
@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule, // the root module should always be the last one
    AppServicesModule, // common and general service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
