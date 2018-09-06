import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from './base.service';
import { LoginInfoModel } from '../shared/models';

@Injectable()
export class LoginService extends BaseService {
  isLoggedIn = false;
  userName = '登陆';
  // store the URL so we can redirect after logging in
  redirectUrl = '/admin';
  login(log: LoginInfoModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    };
    const url = `/apis/login`;
    return this.http.post(url, log, httpOptions)
    .pipe(catchError(this.handleError));
  }
  logout() {
    this.isLoggedIn = false;
    this.userName = '登陆';
    const url = `/apis/login`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }
  check() {
    const url = `/apis/login`;
    return this.http.get(url, {}).pipe(catchError(this.handleError));
  }
}
