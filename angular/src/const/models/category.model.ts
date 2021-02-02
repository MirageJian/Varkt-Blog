import {UserInfoModel} from '@const/models/user-info.model';

export class CategoryModel{
  id: number;
  idUser: number;
  label: string;
  icon?: string;

  user?: UserInfoModel;
}
