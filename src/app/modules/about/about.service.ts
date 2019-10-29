import { Injectable } from '@angular/core';
import {BaseService} from "@app-services/base.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AboutService extends BaseService{
  getAbout() {
    return this.http.get(this.url.about).pipe(catchError(this.handleError))
  }
}
