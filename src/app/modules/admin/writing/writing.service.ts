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
    body.img = WritingService.getFistImgFromContent(article.content);
    body.subhead = text.substr(0, 100) + '...';
    return this.http.put(this.url.article, body).pipe(catchError(this.handleError));
  }
  postArticle(article: ArticleModel, text: string) {
    const body = {...article};
    JsonHelper.toJson(body, JsonHelper.articleMember);
    body.img = WritingService.getFistImgFromContent(article.content);
    body.subhead = text.substr(0, 100) + '...';
    return this.http.post(this.url.article, body).pipe(catchError(this.handleError));
  }
  // get the fist image from the content
  private static getFistImgFromContent(content: any) {
    const images = content.filter(op => op.insert.hasOwnProperty('image'));
    if (images.length > 0) {
      return images[0].insert.image;
    } else {
      return null;
    }
  }
}
