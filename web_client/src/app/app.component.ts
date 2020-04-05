import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BaseService} from "@app-services/base.service";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private _baseService: BaseService,
              private router: Router) {

  }

  ngOnInit(): void {
    this._baseService.getXsrfCookie().subscribe(() =>{}, () => {
      // redirect to error page
      this.router.navigate(['/error-page', {url: this.router.url}]).then();
    });
  }
}
