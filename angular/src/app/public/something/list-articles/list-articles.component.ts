import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SomethingService} from '../../services/something.service';
import {ListArticleModel} from '@const/models';
import {ActivatedRoute, Router} from '@angular/router';
import {slideFromBottom} from '@const/animations';

@Component({
  templateUrl: './list-articles.component.html',
  styleUrls: ['../../../shared/base-page.style.css', './list-articles.component.scss'],
  animations: [slideFromBottom()]
})
export class ListArticlesComponent implements OnInit, OnChanges, OnDestroy {
  articles: ListArticleModel[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _somethingService: SomethingService
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe((res: {articles: ListArticleModel[]}) => {
      this.articles = res.articles;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  ngOnDestroy(): void {
  }
}
