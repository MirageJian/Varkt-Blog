import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ArticleModel} from '@const/models';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '../../layout/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseService implements Resolve<ArticleModel> {
  constructor(http: HttpClient, injector: Injector, private router: Router) {
    super(http, injector);
  }

  getArticle(id: number): Observable<ArticleModel> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http
      .get<ArticleModel>('/api/article', {params})
      .pipe(
        map((a: ArticleModel) => {
          a.category = JSON.parse(a.category as string);
          return a;
        }),
        catchError(this.handleError)
      );
  }

  getComments(idArticle: number) {
    let params = new HttpParams();
    params = params.set('id_article', idArticle.toString());
    return this.http.get('/api/comment', {params}).pipe(catchError(this.handleError));
  }

  postComment(body) {
    return this.http.post('/api/comment', body).pipe(catchError(this.handleError));
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticleModel> | Promise<ArticleModel> | ArticleModel {
    const param = +route.params.id;
    if (!param) this.router.navigate(['/error-page']).then();
    return this.getArticle(param).pipe(catchError(this.handlePageError));
  }
}
