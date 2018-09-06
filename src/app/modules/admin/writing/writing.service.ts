import { Injectable } from '@angular/core';
import {SomethingService} from '../../something/something.service';
import {catchError} from 'rxjs/internal/operators';
import {ArticleModel} from '../../../shared/models';
import {JsonHelper} from '../../../shared/tools';

@Injectable()
export class WritingService extends SomethingService {
  putArticle(article: ArticleModel, text: string) {
    const body = {...article} as ArticleModel;
    JsonHelper.toJson(body, ['category', 'content']);
    body.subhead = text.substr(0, 100);
    return this.http.put(this.url.article, body).pipe(catchError(this.handleError));
  }
  postArticle(article: ArticleModel, text: string) {
    const body = {...article};
    JsonHelper.toJson(body, JsonHelper.articleMember);
    body.subhead = text.substr(0, 100);
    return this.http.post(this.url.article, body).pipe(catchError(this.handleError));

  }
}
