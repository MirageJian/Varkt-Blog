import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {searchBox} from "./navbar-search.animation";
import {MOBILE_BREAKPOINT} from "@const/app-const";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [searchBox]
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptionBreakpoint: Subscription;
  isShownSearch = false;
  searchContent: string;
  get loggedUser() {
    return this.loginService.user;
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    @Inject(LOCALE_ID) public localeId,
    private breakpointObserver: BreakpointObserver,
  ) {
    // If width change, this observable will respond
    this.subscriptionBreakpoint = breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
        this.isShownSearch = !result.matches;
    });
  }

  ngOnInit() {
    console.log("Current language of browser: " + this.localeId);
    // check login status for loging in automatically
    if (!this.loggedUser) this.loginService.getUser().subscribe();
  }

  logout() {
    // Logout and delete logged user, then navigate
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/login']).catch();
    });
  }

  submitSearch() {
    if (!this.searchContent || this.searchContent.length < 1) return;
    if (this.checkIsMobile) this.isShownSearch = false;
    this.router.navigate(['/something'], {queryParams: {keyword: this.searchContent}}).then();
  }

  ngOnDestroy() {
    this.subscriptionBreakpoint.unsubscribe();
  }

  // Check if is in mobile width
  private get checkIsMobile() {
    return this.breakpointObserver.isMatched(MOBILE_BREAKPOINT);
  }
}
