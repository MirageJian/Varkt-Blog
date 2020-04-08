import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { LoginInfoModel } from '@shared/models';
import {Md5} from "ts-md5";

@Injectable()
export class LoginService extends BaseService {
  isLoggedIn = false;
  userName = null;
  // store the URL so we can redirect after logging in
  redirectUrl = '/admin';
  login(log: LoginInfoModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    };
    const body = {account: log.account, password: Md5.hashStr(log.password).toString()};
    return this.http.post(this.url.login, body, httpOptions).pipe(catchError(this.handleError));
  }
  logout() {
    this.isLoggedIn = false;
    this.userName = null;
    return this.http.delete(this.url.login).pipe(catchError(this.handleError));
  }
  check() {
    return this.http.get(this.url.login, {}).pipe(catchError(this.handleError));
  }
}
