import {UserInfoModel} from '@const/models/user-info.model';

export class ArticleModel{
  constructor() {
    this.id = 0;
    this.stick = true;
    this.collection = false;
    this.content = '';
  }
  public id: number;
  public idUser: number;
  public title: string;
  public content: string | any;
  public createdAt: Date;
  public stick: boolean;
  public collection: boolean;
  public img?: string;
  public subhead?: string;
  public category?: string | string[];
  public updatedAt?: Date;

  public user?: UserInfoModel;
}
