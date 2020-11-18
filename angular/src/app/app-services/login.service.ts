import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {BaseService} from './base.service';
import {UserInfoModel} from '@shared/models';
import {Md5} from "ts-md5";
import {isPlatformBrowser} from "@angular/common";
import {EMPTY, Observable, of} from "rxjs";

@Injectable()
export class LoginService extends BaseService {
  // Store the URL so we can redirect after logging in
  redirectUrl = '/admin';
  user: UserInfoModel;
  // user$: EventEmitter<UserInfoModel>;

  constructor(http: HttpClient, @Inject(PLATFORM_ID) private platformId) {
    super(http);
    // this.user$ = new EventEmitter<UserInfoModel>();
  }

  login(log: UserInfoModel): Observable<UserInfoModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    };
    // MD5 encryption
    const body = {account: log.username, password: Md5.hashStr(log.password).toString()};
    return this.http.post<UserInfoModel>('/api/login', body, httpOptions).pipe(
      catchError(this.handleError), map(res => this.user = res)
    );
  }

  /** Get current logged in user */
  getUser(): Observable<UserInfoModel> {
    if (!isPlatformBrowser(this.platformId)) return EMPTY;
    // Send http request for user information
    else return this.http.get<UserInfoModel>('/api/login').pipe(
      catchError(() => of(null)), tap(res => this.user = res)
    );
  }

  /** Delete user cookies */
  logout() {
    this.user = null;
    this.redirectUrl = '/admin';
    return this.http.delete('/api/login').pipe(catchError(this.handleError));
  }
}
