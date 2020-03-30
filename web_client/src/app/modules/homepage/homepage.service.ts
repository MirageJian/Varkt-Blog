import { Injectable } from '@angular/core';
import {BaseService} from "@app-services/base.service";
import {catchError} from "rxjs/operators";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ListArticleModel} from "@shared/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomepageService extends BaseService implements Resolve<ListArticleModel[]>{
  getDashboard(): Observable<ListArticleModel[]> {
    return this.http.get<ListArticleModel[]>(this.url.dashboard).pipe(catchError(this.handleError));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListArticleModel[]> | Promise<ListArticleModel[]> | ListArticleModel[] {
    return this.getDashboard();
  }
}
