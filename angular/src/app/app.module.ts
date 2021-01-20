import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ErrorPageComponent} from './layout/error-page/error-page.component';
import {isPlatformBrowser} from '@angular/common';
import {httpInterceptorProviders} from './http-interceptors';
import {AppLayoutModule} from './layout/app-layout.module';
import {RouterModule} from '@angular/router';

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
    AppLayoutModule,
    // The root route should always be the last one. Common and general service. Error Dialog
    RouterModule.forRoot([], {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected'
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    Title,
    httpInterceptorProviders,
  ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
