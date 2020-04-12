export class ArticleModel{
  constructor() {
    this.id = 0;
    this.stick = true;
    this.collection = false;
  }
  public id: number;
  public author: string;
  public title: string;
  public img: string;
  public subhead: string;
  public content: string | any;
  public category: string | [];
  public time: string;
  public update_time: string;
  public stick: boolean;
  public collection: boolean;
}
