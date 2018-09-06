import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginService} from '../../app-services/login.service';
import {Router} from '@angular/router';
import {WebConfig} from "../../shared/tools";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  title: string;
  username: string;
  // check if the device is mobile
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  // Nav content
  constructor(
    private loginService: LoginService,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
    this.mobileQuery = this.media.matchMedia(WebConfig.mobileWidth);
    this.mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.username = this.loginService.userName;
    switch (this.router.url) {
      case '/admin': this.title = 'Dashboard'; break;
      case '/admin/writing': this.title = 'Writing'; break;
      case '/admin/managing': this.title = 'Managing'; break;
      case '/admin/workbook': this.title = 'Workbook'; break;
      case '/admin/setting': this.title = 'Setting'; break;
      case '/admin/po-young': this.title = 'PoYoung'; break;
    }
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  clickNav(title: string, sidenav: any) {
    this.title = title;
    if (this.mobileQuery.matches) {
      sidenav.close();
    }
  }
}
