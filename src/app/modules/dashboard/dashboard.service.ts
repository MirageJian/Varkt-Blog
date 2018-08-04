import { Injectable } from '@angular/core';
import {BaseService} from "../../app-services/base.service";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService{

  getDashboard() {
    return this.http.get(this.url.dashboard).pipe(catchError(this.handleError));
  }
}
