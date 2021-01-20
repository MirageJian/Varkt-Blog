import {Injectable, Injector, NgZone} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable()
export class BaseService {
  constructor(
    protected http: HttpClient,
    private injector: Injector,
  ) {}

  protected get handleError() {
    // Create a closure to use httpErrorSnackbar
    return (res: HttpErrorResponse) => {
      // A client-side or network error occurred. Handle it accordingly.
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`An error occurred: Backend returned code ${res.status}, ` + `body was: ${res.error}`);
      this.open(res.error, true);
      // return an ErrorObservable with a user-facing error message
      return throwError(`Something bad happened. code ${res.status}`);
    };
  }

  protected get handlePageError() {
    return (res: HttpErrorResponse) => {
      this.open(res.error, true);
      return throwError(`Something bad happened. code ${res.status}`);
    };
  }

  // Open snackbar for notification
  protected open(text: string, redirect = false) {
    const ngZone = this.injector.get(NgZone);
    const router = this.injector.get(Router);
    const snackBar = this.injector.get(MatSnackBar);
    ngZone.run(() => {
      if (redirect) router.navigate(['/error-page', {url: router.url}]).then();
      snackBar.open(text, 'Close');
    });
  }
}
