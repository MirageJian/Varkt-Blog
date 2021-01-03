import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {BaseService} from "./services/base.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_DURATION} from "@const/app-const";

@Component({
  template: `
    <app-navbar></app-navbar>
    <app-loading *ngIf="isLoading"></app-loading>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscriptionRouter: Subscription;
  isLoading: boolean;

  constructor(
    private _baseService: BaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // Loading animation part
    this.subscriptionRouter = this.router.events.pipe(
      // map(() => this.route),
      // map(route => {
      //   while (route.firstChild) {
      //     route = route.firstChild;
      //     console.log(route);
      //   }
      // }),
      // filter(route => route.outlet === 'primary'),
      // mergeMap(route => route.data),
      filter((event: any) => event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationStart
        || event instanceof NavigationError)
    ).subscribe((event: any) => {
      // Check route event in which state
      if (event instanceof NavigationStart) this.isLoading = true;
      else if (event instanceof NavigationEnd) this.isLoading = false;
      else if (event instanceof NavigationCancel) {
        this.isLoading = false;
        this.snackBar.open('No permission to there.', 'OK', {duration: SNACKBAR_DURATION.middle})
      }
      else if (event instanceof NavigationError) {
        this.isLoading = false;
        this.snackBar.open('Navigation fails! Please try again.', 'OK', {duration: SNACKBAR_DURATION.middle})
      }
    });
  }

  // Destroy listener
  ngOnDestroy(): void {
    this.subscriptionRouter.unsubscribe();
  }
}
