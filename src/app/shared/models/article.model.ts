export class ArticleModel{
  constructor() {
    this.id = 0;
    this.stick = false;
    this.collection = false;
    this.about = false;
  }
  public id: number;
  public author: string;
  public title: string;
  public img: string;
  public subhead: string;
  public content: string | any;
  public category: string | any;
  public time: string;
  public update_time: string;
  public stick: boolean;
  public collection: boolean;
  public about: boolean;
}
