import { Component, OnInit } from '@angular/core';
import {ListArticleModel} from "@shared/models";
import {HomepageService} from "./homepage.service";
import {slideFromBottom} from "@shared/animations";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [slideFromBottom()]
})
export class HomepageComponent implements OnInit {
  listArticle: ListArticleModel[];

  constructor(
    private generalService: HomepageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((res: {data: ListArticleModel[]}) => {
      this.listArticle = res.data;
      if (this.listArticle.length <= 0) {
        let a = new ListArticleModel();
        a.title = '啊咧？！';
        a.subhead = '首页似乎没有文章了，空空的';
        this.listArticle.push(a);
      }
    });
  }
}
