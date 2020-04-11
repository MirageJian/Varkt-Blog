import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {loadingAni} from "./loadding/loading.animation";
import {BaseService} from "@app-services/base.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_DURATION} from "@shared/app-const";

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
    private _baseService: BaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // Loading animation part
    this.subscriptionRouter = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationStart
        || event instanceof NavigationError)
    ).subscribe((event: any) => {
      if (event instanceof NavigationStart) this.isLoading = true;
      else if (event instanceof NavigationEnd) this.isLoading = false;
      else if (event instanceof NavigationCancel) {
        this.isLoading = false;
        this.snackBar.open('No permission to there.', 'OK', {duration: SNACKBAR_DURATION.middle})
      }
      else if (event instanceof NavigationError) {
        this.isLoading = false;
        this.snackBar.open('Navigation fails! Please try again.', 'OK')
      }
    });
  }

  // Destroy listener
  ngOnDestroy(): void {
    this.subscriptionRouter.unsubscribe();
  }
}
