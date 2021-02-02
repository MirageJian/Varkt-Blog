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
      this.open(res.error);
      // return an ErrorObservable with a user-facing error message
      return throwError(res);
    };
  }

  protected get handlePageError() {
    const router = this.injector.get(Router);

    return (res: HttpErrorResponse) => {
      router.navigate(['/error-page', {url: router.url}]).then();
      return throwError(`Something bad happened. code ${res.status}`);
    };
  }

  // Open snackbar for notification
  protected open(text: string) {
    const ngZone = this.injector.get(NgZone);
    const snackBar = this.injector.get(MatSnackBar);
    ngZone.run(() => {
      snackBar.open(text, 'Close');
    });
  }
}
