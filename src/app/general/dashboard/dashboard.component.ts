import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../general.service";
import {ArticleModel, ListArticleModel} from "../../shared/models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listArticle: ListArticleModel[];

  constructor(
    private generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.generalService.getDashboard().subscribe((res: ListArticleModel[]) => {
      this.listArticle = res;
      if (this.listArticle.length <= 0) {
        let a = new ListArticleModel();
        a.title = '啊咧？！';
        a.subhead = '首页似乎没有文章了，空空的';
        this.listArticle.push(a);
      }
    })
  }
}
