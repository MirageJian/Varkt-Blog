import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BaseService} from "@app-services/base.service";
import {HttpXsrfTokenExtractor} from "@angular/common/http";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private _baseService: BaseService,
              private router: Router,
              private xsrfExtractor: HttpXsrfTokenExtractor
  ) {
  }

  ngOnInit(): void {
    // If there is no token, get token first
    if (!this.xsrfExtractor.getToken()) {
      this._baseService.getXsrfCookie().subscribe(() => {
      }, () => {
        // Redirect to error page
        this.router.navigate(['/error-page', {url: this.router.url}]).then();
      });
    }
  }
}
