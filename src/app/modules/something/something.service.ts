import {BaseService} from '../../app-services/base.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class SomethingService extends BaseService {
  getListCategory(): Observable<any> {
    return this.http.get(this.url.category).pipe(catchError(this.handleError));
  }

  getListArticle(category: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('category', category);
    return this.http.get(this.url.something, {params: params}).pipe(catchError(this.handleError));
  }

  getArticle(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.get(this.url.article, {params: params}).pipe(catchError(this.handleError));
  }
  getComments(id_article: number) {
    let params = new HttpParams();
    params = params.set('id_article', id_article.toString());
    return this.http.get(this.url.comment, {params: params}).pipe(catchError(this.handleError));
  }
  getSearchResult(keyword: string) {
    if (!keyword || keyword.length < 1) return of(null); //
    let params = new HttpParams();
    params = params.set('keyword', keyword);
    return this.http.get(this.url.searching, {params: params}).pipe(catchError(this.handleError));
  }
  putComment(body) {
    return this.http.put(this.url.comment, body).pipe(catchError(this.handleError));
  }
}
