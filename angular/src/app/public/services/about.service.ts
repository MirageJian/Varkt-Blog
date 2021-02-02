import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AboutModel} from '@const/models';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseService} from '../../layout/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService extends BaseService implements Resolve<AboutModel> {
  public getAbout(): Observable<AboutModel> {
    return this.http.get<AboutModel>('/api/about').pipe(catchError(this.handleError));
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AboutModel> | Promise<AboutModel> | AboutModel {
    return this.getAbout().pipe(catchError(this.handlePageError));
  }
}
