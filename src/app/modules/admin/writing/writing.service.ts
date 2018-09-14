import { Injectable } from '@angular/core';
import {SomethingService} from '../../something/something.service';
import {catchError} from 'rxjs/operators';
import {ArticleModel, CategoryModel} from '../../../shared/models';
import {JsonHelper} from '../../../shared/tools';
import {HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class WritingService extends SomethingService {
  putArticle(article: ArticleModel, text: string) {
    const body = {...article} as ArticleModel;
    JsonHelper.toJson(body, ['category', 'content']);
    body.img = article.content.filter(op => op.insert.hasOwnProperty('image'))[0];
    body.subhead = text.substr(0, 100) + '...';
    return this.http.put(this.url.article, body).pipe(catchError(this.handleError));
  }
  postArticle(article: ArticleModel, text: string) {
    const body = {...article};
    JsonHelper.toJson(body, JsonHelper.articleMember);
    body.img = article.content.filter(op => op.insert.hasOwnProperty('image'))[0];
    body.subhead = text.substr(0, 100) + '...';
    return this.http.post(this.url.article, body).pipe(catchError(this.handleError));
  }
}
