import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '@app-services/login.service';
import {HttpXsrfTokenExtractor} from "@angular/common/http";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private tokenExtractor: HttpXsrfTokenExtractor) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Store the attempted URL for redirecting
    this.loginService.redirectUrl = state.url;
    if (this.loginService.loggedUser) return true;
    else {
      this.router.navigate(['/login']).then();
      return false;
    }
    // return this.checkLogin(url);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
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
