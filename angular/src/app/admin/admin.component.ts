import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginService} from '@app-services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MOBILE_WIDTH} from "@shared/app-const";

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  title: string;
  get loggedUser() {
    return this.loginService.user;
  };
  // check if the device is mobile
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  // Nav content
  constructor(
    private loginService: LoginService,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mobileQuery = this.media.matchMedia(MOBILE_WIDTH);
    this.mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };
    // this.mobileQuery.addEventListener('mobileQuery', this.mobileQueryListener);
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  // Give title a value when browser was refreshed
  ngOnInit() {
    this.route.data.subscribe();
    switch (this.router.url) {
      case '/admin': this.title = 'Dashboard'; break;
      case '/admin/go-markdown': this.title = 'Go Markdown'; break;
      case '/admin/managing': this.title = 'Managing'; break;
      case '/admin/about-managing': this.title = 'About Managing'; break;
      case '/admin/settings': this.title = 'Setting'; break;
      case '/admin/po-young': this.title = 'PoYoung'; break;
      case '/admin/public-files': this.title = 'Public Files'; break;
    }
  }

  ngOnDestroy() {
    // this.mobileQuery.removeEventListener('mobileQuery', this.mobileQueryListener);
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  // Tile value and Close navbar in Mobile mode
  clickNav(title: string, sidenav: any) {
    this.title = title;
    if (this.mobileQuery.matches) {
      sidenav.close();
    }
  }
}
