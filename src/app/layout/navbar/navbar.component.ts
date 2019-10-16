import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../../app-services/login.service';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ResModel} from '../../shared/models';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptionRouter: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService
  ) {
  }

  ngOnInit() {
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
          this.loginService.userName = '登陆';
        }
      });
  }

  logout() {
    this.loginService.logout().subscribe(() => this.loginService.userName = '登陆');
    this.router.navigate(['/']).catch();
  }

  ngOnDestroy() {
    this.subscriptionRouter.unsubscribe();
  }
}
