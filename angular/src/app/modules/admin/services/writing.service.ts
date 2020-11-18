import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ArticleModel} from '@shared/models';
import {ArticleService} from "../../public/services/article.service";

@Injectable()
export class WritingService extends ArticleService {
  addOrUpdateArticle(article: ArticleModel) {
    if (article.id == 0)
      return this.http.post('/api/article', WritingService.prePolish(article)).pipe(catchError(this.handleError));
    else
      return this.http.put('/api/article', WritingService.prePolish(article)).pipe(catchError(this.handleError));
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
