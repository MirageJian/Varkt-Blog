import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '@app-services/login.service';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';
import {ResModel} from '@shared/models';
import {filter} from 'rxjs/operators';
import {searchBox} from "./navbar-search.animation";
import {MOBILE_BREAKPOINT} from "@shared/app-const";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [searchBox]
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptionRouter: Subscription;
  subscriptionBreakpoint: Subscription;
  isShownSearch = false;
  searchContent: string;

  constructor(
    private router: Router,
    public loginService: LoginService,
    @Inject(LOCALE_ID) public localeId,
    private breakpointObserver: BreakpointObserver
  ) {
    // If width change, this observable will respond
    this.subscriptionBreakpoint = breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
        this.isShownSearch = !result.matches;
    });
  }

  ngOnInit() {
    console.log("Current language of browser: " + this.localeId);
    // check login status for loging in automatically
    this.loginService.check().subscribe((res: ResModel) => {
      if (res.code === 0) {
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
    if (!this.searchContent || this.searchContent.length < 1) return;
    if (this.checkIsMobile) this.isShownSearch = false;
    this.router.navigate(['/something'], {queryParams: {keyword: this.searchContent}}).then();
  }

  ngOnDestroy() {
    this.subscriptionRouter.unsubscribe();
    this.subscriptionBreakpoint.unsubscribe();
  }

  // Check if is in mobile width
  private get checkIsMobile() {
    return this.breakpointObserver.isMatched(MOBILE_BREAKPOINT);
  }
}
