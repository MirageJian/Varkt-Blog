export interface ResModel<T = any> {
  errcode: number;
  errmsg: string;
  data: T;
}
