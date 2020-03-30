import { Injectable } from '@angular/core';
import {BaseService} from "@app-services/base.service";
import {catchError} from "rxjs/operators";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AboutModel} from "@shared/models/about.model";

@Injectable({
  providedIn: 'root'
})
export class AboutService extends BaseService implements Resolve<AboutModel> {
  public getAbout(): Observable<AboutModel> {
    return this.http.get<AboutModel>(this.url.about).pipe(catchError(this.handleError));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AboutModel> | Promise<AboutModel> | AboutModel {
    return this.getAbout();
  }
}
