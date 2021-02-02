import {UserInfoModel} from '@const/models/user-info.model';

export class AboutModel{
  public id: number;
  public idUser: number;
  public content: string | any;
  public createdAt: Date;
  public updatedAt?: Date;

  public user?: UserInfoModel;
}
