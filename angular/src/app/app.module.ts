import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ErrorPageComponent} from "./layout/error-page/error-page.component";
import {isPlatformBrowser} from "@angular/common";
import {httpInterceptorProviders} from "./http-interceptors";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: '_xsrf', // Define your title of xsrf param
      headerName: 'X-XSRFToken',
    }),
    // The root module should always be the last one. Common and general service. Error Dialog
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    Title,
    httpInterceptorProviders,
  ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
