import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable()
export class BaseService {

  constructor(
    protected http: HttpClient
  ) {}

  protected handleError(res: HttpErrorResponse) {
    // A client-side or network error occurred. Handle it accordingly.
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(`An error occurred: Backend returned code ${res.status}, ` + `body was: ${res.error}`);
    // return an ErrorObservable with a user-facing error message
    return throwError(`Something bad happened. code ${res.status}`);
  }
}
