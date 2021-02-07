export class SimpleArticleModel {
  id: number;
  author: string;
  title: string;
  createdAt: Date;
  category?: string[];
  img?: string;
  subhead?: string;
}
