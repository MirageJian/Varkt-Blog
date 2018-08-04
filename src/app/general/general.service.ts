import {Injectable} from "@angular/core";
import {BaseService} from "../base.service";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class GeneralService extends BaseService {
  getAbout() {
    return this.http.get(this.url.about).pipe(catchError(this.handleError))
  }
  getDashboard() {
    return this.http.get(this.url.dashboard).pipe(catchError(this.handleError));
  }
}
