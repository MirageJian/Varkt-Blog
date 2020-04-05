import {BaseService} from '@app-services/base.service';
import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class SomethingService extends BaseService {
  private _label: string;

  getListCategory(): Observable<any> {
    return this.http.get(this.url.category).pipe(catchError(this.handleError));
  }

  getListArticle(category: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('category', category);
    return this.http.get(this.url.something, {params: params}).pipe(catchError(this.handleError));
  }

  getSearchResult(keyword: string) {
    // input validation, return observable of null
    if (!keyword || keyword.length < 1) return of(null); //
    let params = new HttpParams();
    params = params.set('keyword', keyword);
    return this.http.get(this.url.searching, {params: params}).pipe(catchError(this.handleError));
  }

  get label() {
    return this._label;
  }
  set label(val) {
    this._label = val;
  }
}
