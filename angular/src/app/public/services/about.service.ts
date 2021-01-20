import {Injectable} from '@angular/core';
import {BaseService} from '../../layout/services/base.service';
import {catchError} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AboutModel} from '@const/models';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends BaseService implements Resolve<AboutModel> {
  public getAbout(): Observable<AboutModel> {
    return this.http.get<AboutModel>('/api/about').pipe(catchError(this.handleError));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AboutModel> | Promise<AboutModel> | AboutModel {
    return this.getAbout();
  }
}
