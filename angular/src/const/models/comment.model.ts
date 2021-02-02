import {ArticleModel} from '@const/models/article.model';

export class CommentModel {
  id: number;
  idArticle: number;
  content: string;
  createdAt: Date;
  likes: number;
  isChecked: boolean;
  author?: string;

  article?: ArticleModel;
}
