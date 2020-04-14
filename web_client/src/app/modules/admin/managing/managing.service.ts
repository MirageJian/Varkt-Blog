import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleService} from "../../article/article.service";

@Injectable()
export class ManagingService extends ArticleService {
  getAllArticle() {
    return this.http.get(this.url.article).pipe(catchError(this.handleError));
  }
  deleteArticle(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.delete(this.url.article, {params: params}).pipe(catchError(this.handleError));
  }
  deleteComment(id: number) {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.delete(this.url.comment_managing, {params: params}).pipe(catchError(this.handleError));
  }
}
