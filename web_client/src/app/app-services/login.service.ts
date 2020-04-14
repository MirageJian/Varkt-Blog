import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {BaseService} from './base.service';
import {ResModel, UserInfoModel} from '@shared/models';
import {Md5} from "ts-md5";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {EMPTY, Observable, of} from "rxjs";

@Injectable()
export class LoginService extends BaseService {
  constructor(http: HttpClient,
              @Inject(PLATFORM_ID) private platformId) {
    super(http, platformId);
  }
  loggedUser: UserInfoModel;

  // store the URL so we can redirect after logging in
  redirectUrl = '/admin';

  login(log: UserInfoModel): Observable<UserInfoModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    };
    const body = {account: log.username, password: Md5.hashStr(log.password).toString()};
    return this.http.post<ResModel>(this.url.login, body, httpOptions).pipe(catchError(this.handleError), map(res =>
      this.loggedUser = res.data)
    );
  }

  getLoggedUser(): Observable<UserInfoModel> {
    if (!isPlatformBrowser(this.platformId)) return EMPTY;
    // Send http request for user information
    else return this.http.get<ResModel>(this.url.login).pipe(catchError(this.handleError),
      map((res: ResModel) => this.loggedUser = res?.data));
  }

  logout() {
    this.loggedUser = null;
    return this.http.delete(this.url.login).pipe(catchError(this.handleError));
  }
}
