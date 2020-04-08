import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {BaseService} from "@app-services/base.service";
import {HttpXsrfTokenExtractor} from "@angular/common/http";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private _baseService: BaseService,
              private router: Router,
              private xsrfExtractor: HttpXsrfTokenExtractor,
              @Inject(PLATFORM_ID) private platformId
  ) {
  }

  ngOnInit(): void {
    // If the app is in server side rendering
    if (isPlatformBrowser(this.platformId) && !this.xsrfExtractor.getToken())
      // If there is no token, get token first
      this._baseService.getXsrfCookie().subscribe({
        // Redirect to error page
        error: () => this.router.navigate(['/error-page', {url: this.router.url}])
      });
  }
}
