import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CategoryModel, SimpleArticleModel} from '@const/models';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '../../layout/services/base.service';

@Injectable()
export class SomethingService extends BaseService {
  getListCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('/api/category').pipe(catchError(this.handleError));
  }

  getListArticle(category: string): Observable<SimpleArticleModel[]> {
    // Set category that will be queried
    let params = new HttpParams();
    params = params.set('category', category);
    return this.http
      .get('/api/something', {params})
      .pipe(this.preProcessForArticles(category), catchError(this.handleError));
  }

  getAllArticles(): Observable<SimpleArticleModel[]> {
    return this.http
      .get<SimpleArticleModel[]>('/api/dashboard')
      .pipe(catchError(this.handleError));
  }

  getSearchResult(keyword: string): Observable<SimpleArticleModel[]> {
    // input validation, return observable of null
    if (!keyword || keyword.length < 1) return of(null);
    // Set search params
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get('/api/searching', {params}).pipe(this.preProcessForArticles(), catchError(this.handleError));
  }

  private preProcessForArticles(category?: string) {
    return map((list: SimpleArticleModel[]) => {
      list.forEach((a: SimpleArticleModel) => {
        // Parse category to array and remove current one querying
        if (category) a.category = a.category.filter(c => c !== category);
      });
      return list;
    });
  }
}
