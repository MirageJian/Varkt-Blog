import {Component, OnInit} from '@angular/core';
import {SimpleArticleModel} from '@const/models';
import {HomepageService} from '../services/homepage.service';
import {slideFromBottom} from '@const/animations';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['../../shared/base-page.style.css', './homepage.component.css'],
  animations: [slideFromBottom()]
})
export class HomepageComponent implements OnInit {
  listArticle: SimpleArticleModel[];
  chips: Set<string>;

  constructor(
    private _homeService: HomepageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((res: {data: SimpleArticleModel[]}) => {
      this.listArticle = res.data;
      // Add chips/category on the top of articles
      this.chips = this._homeService.getChips(this.listArticle);
      if (this.listArticle.length <= 0) {
        const a = new SimpleArticleModel();
        a.title = '啊咧？！';
        a.subhead = '首页似乎没有文章了，空空的';
        this.listArticle.push(a);
      }
    });
  }
}
