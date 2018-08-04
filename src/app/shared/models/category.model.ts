import {BaseModel} from './base.model';

export class CategoryModel implements BaseModel{
  id: number;
  label: string;
  icon: string;
  primary: boolean;
}
