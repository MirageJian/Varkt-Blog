import {BaseModel} from './base.model';

export class ListArticleModel implements BaseModel {
  id: number;
  author: string;
  title: string;
  category: string;
  subhead: string;
  time: string;
}
