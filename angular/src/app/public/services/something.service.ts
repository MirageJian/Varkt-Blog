import {BaseService} from '../../layout/services/base.service';
import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CategoryModel, ListArticleModel} from "@const/models";

@Injectable()
export class SomethingService extends BaseService {

  getListCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('/api/category').pipe(catchError(this.handleError));
  }

  getListArticle(category: string): Observable<ListArticleModel[]> {
    // Set category that will be queried
    let params = new HttpParams();
    params = params.set('category', category);
    return this.http.get('/api/something', {params: params}).pipe(
      this.preProcessForArticles(category), catchError(this.handleError));
  }

  getAllArticles(): Observable<ListArticleModel[]> {
    return this.http.get<ListArticleModel[]>('/api/dashboard').pipe(
      this.preProcessForArticles(), catchError(this.handleError));
  }

  getSearchResult(keyword: string): Observable<ListArticleModel[]> {
    // input validation, return observable of null
    if (!keyword || keyword.length < 1) return of(null);
    // Set search params
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get('/api/searching', {params: params}).pipe(
      this.preProcessForArticles(), catchError(this.handleError));
  }

  private preProcessForArticles(category?: string) {
    return map((list: ListArticleModel[]) => {
      list.forEach((a: ListArticleModel) => {
        a.category = JSON.parse(a.category as string);
        // Parse category to array and remove current one querying
        if (category) a.category = (a.category as Array<string>).filter(c => c != category)
      });
      return list;
    });
  }
}
