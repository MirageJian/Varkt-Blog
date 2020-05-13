export class CommentModel {
  id: number;
  id_article: number;
  content: string;
  author: string;
  time: Date;
  likes: number;
  is_check: boolean;
}
