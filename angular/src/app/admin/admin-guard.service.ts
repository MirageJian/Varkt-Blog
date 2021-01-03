import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../layout/services/login.service';
import {HttpXsrfTokenExtractor} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private tokenExtractor: HttpXsrfTokenExtractor) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Store the attempted URL for redirecting
    this.loginService.redirectUrl = state.url;
    // Wait authentication
    return this.loginService.getUser().pipe(map(() => !!this.loginService.user), tap(can => {
      if (!can) this.router.navigate(['/login']).then();
    }));
    // return this.checkLogin(url);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  // checkLogin(url: string): boolean {
  //   this.loginService.check().subscribe((res: ResModel) => {
  //     console.log('Check in admin-guard');
  //     if (res.code === 0) {
  //       this.loginService.isLoggedIn = true;
  //       this.loginService.userName = res.data;
  //       this.router.navigate([url]).then();
  //     } else {
  //       this.loginService.isLoggedIn = false;
  //       // Navigate to the login page with extras
  //       this.router.navigate(['/login']).then();
  //     }
  //   });
  //   return this.loginService.isLoggedIn;
  // }
}
