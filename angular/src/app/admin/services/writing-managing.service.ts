import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleService} from '../../public/services/article.service';
import {ArticleModel} from '@const/models';

@Injectable()
export class WritingManagingService extends ArticleService {
  getAllArticle() {
    return this.http.get('/api/article').pipe(catchError(this.handleError));
  }

  deleteArticle(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.delete('/api/article', {params}).pipe(catchError(this.handleError));
  }

  deleteComment(id: number) {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.delete('/api/comment_managing', {params}).pipe(catchError(this.handleError));
  }

  addOrUpdateArticle(article: ArticleModel) {
    if (article.id === 0) return this.http.post('/api/article', prePolish(article)).pipe(catchError(this.handleError));
    else return this.http.put('/api/article', prePolish(article)).pipe(catchError(this.handleError));
  }
}

function prePolish(article: ArticleModel) {
  const copyArticle = {...article};
  const images = article.content.match(/<img[^>]*src="([^"]*)"[^>]*>/);
  copyArticle.img = images && images.length > 1 ? images[1] : null;
  // Use copy of article because writing component needs to keep original
  return copyArticle;
}
