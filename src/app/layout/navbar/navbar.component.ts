import {ChangeDetectorRef, Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../../app-services/login.service';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';
import {ResModel} from '../../shared/models';
import {filter} from 'rxjs/operators';
import {searchBox} from "./navbar-search.animation";
import {AppConst} from "../../shared/app-const";
import {BreakpointObserver, Breakpoints, MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [searchBox]
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptionRouter: Subscription;
  isShownSearch = false;

  constructor(
    private router: Router,
    public loginService: LoginService,
    @Inject(LOCALE_ID) public localeId,
    private breakpointObserver: BreakpointObserver
  ) {
    // if in the desktop width
    breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).subscribe(result => {
      if (!result.matches) {
        this.isShownSearch = true;
      }
    });

  }

  ngOnInit() {
    console.log(this.localeId);
    // check login status for loging in automatically
    this.loginService.check().subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.loginService.isLoggedIn = true;
        this.loginService.userName = res.data;
        // const nowPath = result ? result[result.length - 1] : '';
      }
    });
    //
    this.subscriptionRouter = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
    // .map(() => this.route)
    // .map(route => {
    //   while (route.firstChild) {
    //     route = route.firstChild;
    //     console.log(route);
    //   }
    // })
    // .filter(route => route.outlet === 'primary')
    // .mergeMap(route => route.data)
      .subscribe(() => {
        if (!this.loginService.isLoggedIn) {
          this.loginService.userName = null;
        }
      });
  }

  logout() {
    this.loginService.logout().subscribe(() => this.loginService.userName = null);
    this.router.navigate(['/']).catch();
  }

  submitSearch() {
    if (this.breakpointObserver.isMatched([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])) {
      this.isShownSearch = false;
    }
  }

  ngOnDestroy() {
    this.subscriptionRouter.unsubscribe();
  }
}
