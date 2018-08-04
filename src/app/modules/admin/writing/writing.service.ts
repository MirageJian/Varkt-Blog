import { Injectable } from '@angular/core';
import {SomethingService} from '../../something/something.service';
import {catchError} from 'rxjs/internal/operators';
import {ArticleModel} from '../../../shared/models';
import {JsonHelperTool} from '../../../shared/tools/json-helper.tool';

@Injectable()
export class WritingService extends SomethingService {
  putArticle(article: ArticleModel, text: string) {
    const body = {...article} as ArticleModel;
    JsonHelperTool.toJson(body, ['category', 'content']);
    body.subhead = text.substr(0, 100);
    return this.http.put(this.url.article, body).pipe(catchError(this.handleError));
  }
  postArticle(article: ArticleModel, text: string) {
    const body = {...article};
    JsonHelperTool.toJson(body, JsonHelperTool.articleMember);
    body.subhead = text.substr(0, 100);
    return this.http.post(this.url.article, body).pipe(catchError(this.handleError));

  }
}
