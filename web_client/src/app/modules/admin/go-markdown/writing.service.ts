import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ArticleModel} from '@shared/models';
import {JsonHelper} from '@shared/tools';
import {BaseService} from "@app-services/base.service";

@Injectable()
export class WritingService extends BaseService {
  addOrUpdateArticle(article: ArticleModel, subhead: string) {
    if (article.id == 0)
      return this.http.post(this.url.article, WritingService.prePolish(article)).pipe(catchError(this.handleError));
    else
      return this.http.put(this.url.article, WritingService.prePolish(article)).pipe(catchError(this.handleError));
  }

  // Get the fist image from the content
  private static prePolish(article: ArticleModel) {
    const copyArticle = {...article};
    const images = article.content.match('<img[^>]*src="([^"]*)"[^>]*>');
    copyArticle.img = images && images.length > 1 ? images[1] : null;
    if (!copyArticle.subhead) copyArticle.subhead = 'He is lazy! Nothing left on description.';
    // Use copy of article because writing component needs to keep original
    copyArticle.category = JSON.stringify(article.category);
    return copyArticle;
  }
}
