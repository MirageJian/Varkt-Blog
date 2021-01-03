import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {AboutModel} from "@const/models/";
import {AboutService} from "../../public/services/about.service";

@Injectable()
export class AboutManagingService extends AboutService {
  updateAbout(model: AboutModel) {
    return this.http.put('/api/about', model).pipe(catchError(this.handleError));
  }
}
