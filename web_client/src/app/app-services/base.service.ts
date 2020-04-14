import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {isPlatformServer} from "@angular/common";

@Injectable()
export class BaseService {
  // Make getting of url dynamic
  protected get url() {
    return {
      main: this.baseUrl + '/',
      login: this.baseUrl + '/login',
      about: this.baseUrl + '/about',
      dashboard: this.baseUrl + '/dashboard',
      something: this.baseUrl + '/something',
      collection: this.baseUrl + '/collection',
      image: this.baseUrl + '/image',
      article: this.baseUrl + '/article',
      comment: this.baseUrl + '/comment',
      comment_managing: this.baseUrl + '/comment_managing',
      category: this.baseUrl + '/category',
      searching: this.baseUrl + '/searching',
      password: this.baseUrl + '/password',
      publicFiles: this.baseUrl + '/public_files'
    }
  };
  public baseUrl: string;

  constructor(
    protected http: HttpClient,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.baseUrl = '/api';
    // From sever use server api
    if (isPlatformServer(platformId)) this.baseUrl = 'http://localhost:8888/api';
  }

  protected handleError(res: HttpErrorResponse) {
    // A client-side or network error occurred. Handle it accordingly.
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(`An error occurred: Backend returned code ${res.status}, ` + `body was: ${res.error}`);
    // return an ErrorObservable with a user-facing error message
    return throwError(`Something bad happened. code ${res.status}`);
  }
}
