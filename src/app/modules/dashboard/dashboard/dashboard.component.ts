import { Component, OnInit } from '@angular/core';
import {ArticleModel, ListArticleModel} from "../../../shared/models";
import {DashboardService} from "../dashboard.service";
import {slideFromBottom} from "../../../shared/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideFromBottom()]
})
export class DashboardComponent implements OnInit {
  listArticle: ListArticleModel[];

  constructor(
    private generalService: DashboardService,
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
