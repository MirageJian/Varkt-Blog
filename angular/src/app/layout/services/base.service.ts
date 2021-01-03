import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class BaseService {
  constructor(
    protected http: HttpClient,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
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
      return throwError(`Something bad happened. code ${res.status}`)
    };
  }

  // Open snackbar for notification
  protected open(text: string) {
    this.ngZone.run(() => {
      this.snackBar.open(text, 'Close', {duration: 10_000});
    });
  }
}