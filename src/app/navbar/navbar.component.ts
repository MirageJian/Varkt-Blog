import {Component, OnDestroy, OnInit} from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import {ResModel} from '../shared/models';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName: string;
  subscriptionRouter: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }
  ngOnInit() {
      // check login status for loging in automatically
      this.loginService.check().subscribe((res: ResModel) => {
          if (res.errcode === 0) {
              this.loginService.isLoggedIn = true;
              this.loginService.userName = res.data;
              this.userName = this.loginService.userName;
              if (this.router.url === '/login') {
                  this.router.navigateByUrl(this.loginService.redirectUrl).catch();
              }
              // const nowPath = result ? result[result.length - 1] : '';
          }
      });
      // modify the admin center title
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
            if (this.loginService.isLoggedIn) {
                this.userName = this.loginService.userName;
            } else {
                this.userName = '登陆';
            }
        });
  }
  logout() {
    this.loginService.logout().subscribe();
    this.router.navigate(['/']).catch();
  }
  ngOnDestroy() {
      this.subscriptionRouter.unsubscribe();
  }
}
