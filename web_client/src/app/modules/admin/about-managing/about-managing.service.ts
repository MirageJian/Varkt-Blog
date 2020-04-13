import { Injectable } from '@angular/core';
import {catchError} from "rxjs/operators";
import {AboutModel} from "@shared/models/about.model";
import {AboutService} from "../../about/about.service";

@Injectable()
export class AboutManagingService extends AboutService {
  updateAbout(model: AboutModel) {
    return this.http.put(this.url.about, model).pipe(catchError(this.handleError));
  }
}
