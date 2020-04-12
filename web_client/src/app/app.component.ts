import {Component, Inject, Injectable, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {BaseService} from "@app-services/base.service";
import {HttpClient, HttpXsrfTokenExtractor} from "@angular/common/http";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  private readonly url;

  constructor(private http: HttpClient,
              private router: Router,
              private xsrfExtractor: HttpXsrfTokenExtractor,
              @Inject(PLATFORM_ID) private platformId
  ) {
    // From sever use server api
    if (isPlatformServer(this.platformId)) this.url = 'http://localhost:8888/api/';
    else this.url = '/api/';
  }

  ngOnInit(): void {
    // If the app is in server side rendering
    if (isPlatformBrowser(this.platformId) && !this.xsrfExtractor.getToken())
      // If there is no token, get token first
      this.getXsrfCookie().subscribe({
        // Redirect to error page
        error: () => this.router.navigate(['/error-page', {url: this.router.url}])
      });
  }

  // request the xsrf cookies.
  private getXsrfCookie() {
    return this.http.get(this.url);
  }
}
