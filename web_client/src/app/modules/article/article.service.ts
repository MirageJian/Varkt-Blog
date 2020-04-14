import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BaseService} from "@app-services/base.service";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ArticleModel} from "@shared/models";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService implements Resolve<ArticleModel>{
  constructor(http: HttpClient, private router: Router, @Inject(PLATFORM_ID) platform, dialog: MatDialog) {
    super(http, platform);
  }

  getArticle(id: number): Observable<ArticleModel> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.get<ArticleModel>(this.url.article, {params: params}).pipe(map((a: ArticleModel) => {
      a.category = JSON.parse(a.category as string);
      return a;
    }), catchError(this.handleError));
  }
  getComments(id_article: number) {
    let params = new HttpParams();
    params = params.set('id_article', id_article.toString());
    return this.http.get(this.url.comment, {params: params}).pipe(catchError(this.handleError));
  }

  postComment(body) {
    return this.http.put(this.url.comment, body).pipe(catchError(this.handleError));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleModel> | Promise<ArticleModel> | ArticleModel {
    const param = +route.params['id'];
    if (!param) this.router.navigate(['/error-page']).then();
    return this.getArticle(param);
  }
}
