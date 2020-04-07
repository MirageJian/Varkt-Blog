import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class BaseService {
  public static HOST = "https://holacodes.com";
  // private baseUrl = "http://localhost:8888";
  private baseUrl = '/apis';
  protected url = {
    login: `${this.baseUrl}/login`,
    about: `${this.baseUrl}/about`,
    dashboard: `${this.baseUrl}/dashboard`,
    something: `${this.baseUrl}/something`,
    collection: `${this.baseUrl}/collection`,
    image: `${this.baseUrl}/image`,
    article: `${this.baseUrl}/article`,
    comment: `${this.baseUrl}/comment`,
    comment_managing: `${this.baseUrl}/comment_managing`,
    category: `${this.baseUrl}/category`,
    searching: `${this.baseUrl}/searching`,
    password: `${this.baseUrl}/password`,
    publicFiles: `${this.baseUrl}/public_files`,

    py_user: `${this.baseUrl}/py_user`,
    py_record: `${this.baseUrl}/py_record`,
    py_code: `${this.baseUrl}/py_code`,
  };

  constructor(
    protected http: HttpClient,
  ) {
  }

  // request the xsrf cookies.
  public getXsrfCookie() {
    return this.http.get(this.baseUrl).pipe(catchError(this.handleError));
  }

  protected handleError(res: HttpErrorResponse) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', res.error?.message);
    // if (res.error instanceof ErrorEvent)
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(`Backend returned code ${res.status}, ` + `body was: ${res.error}`);

    // return an ErrorObservable with a user-facing error message
    return throwError(
      `Something bad happened. code ${res.status}`
    );
  }
}
