import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '@app-services/login.service';
import {ResModel} from "@shared/models";
import {HttpXsrfTokenExtractor} from "@angular/common/http";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private tokenExtractor: HttpXsrfTokenExtractor) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  checkLogin(url: string): boolean {
    // Store the attempted URL for redirecting
    this.loginService.redirectUrl = url;
    this.loginService.check().subscribe((res: ResModel) => {
      console.log('Check in admin-guard');
      if (res.errcode === 0) {
        this.loginService.isLoggedIn = true;
        this.loginService.userName = res.data;
        this.router.navigate([url]).then();
      } else {
        this.loginService.isLoggedIn = false;
        // Navigate to the login page with extras
        this.router.navigate(['/login']).then();
      }
    });
    return this.loginService.isLoggedIn;
  }
}
