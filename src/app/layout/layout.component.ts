import {Component, OnInit} from '@angular/core';
import {BaseService} from "../app-services/base.service";
import {ErrorPageEnum} from "./error-page/error-page.enum";
import {Router} from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {AuthorizationService} from "../modules/authorization/authorization.service";

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: [`
    app-navbar {
      flex: 0 0 auto;
    }`],
})
export class LayoutComponent implements OnInit {

  constructor(
    private _authorization: AuthorizationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this._authorization.getXsrfCookie().subscribe(() =>{}, () => {
      // redirect to error page
      this.router.navigate(['/error-page', {type: ErrorPageEnum.notResponded}]).then();
    });
    // this.snackBar.open(
    //   "This site uses cookies to analyze for some Machine Learning tests and fun things",
    //   "OK"
    // );
  }
}
