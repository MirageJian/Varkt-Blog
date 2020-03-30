import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorPageEnum} from "./error-page/error-page.enum";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {AuthorizationService} from "../modules/authorization/authorization.service";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {loadingAni} from "./loadding/loading.animation";

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>
    <app-loading *ngIf="isLoading" [@loadingAni]></app-loading>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  animations: [loadingAni]
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscriptionRouter: Subscription;
  isLoading: boolean;

  constructor(
    private _authorization: AuthorizationService,
    private router: Router
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
    // Loading animation part
    this.subscriptionRouter = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd || event instanceof NavigationStart))
      .subscribe((event: NavigationStart | NavigationEnd) => {
        if (event instanceof NavigationStart) this.isLoading = true;
        if (event instanceof NavigationEnd) this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionRouter.unsubscribe();
  }
}
