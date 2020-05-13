export class ArticleModel{
  constructor() {
    this.id = 0;
    this.stick = true;
    this.collection = false;
    this.content = '';
  }
  public id: number;
  public author: string;
  public title: string;
  public img: string;
  public subhead: string;
  public content: string | any;
  public category: string | string[];
  public time: Date;
  public update_time: Date;
  public stick: boolean;
  public collection: boolean;
}
