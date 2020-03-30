import {Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy} from '@angular/core';
import {SomethingService} from '../../something.service';
import {ListArticleModel} from '@shared/models';
import {ActivatedRoute} from '@angular/router';
import {JsonHelper} from "@shared/tools";
import {slideFromBottom} from "@shared/animations";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss'],
  animations: [slideFromBottom()]
})
export class ListArticlesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() private label: string;
  articles: ListArticleModel[];
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private somethingService: SomethingService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((res: {articles: ListArticleModel[]}) => {
      this.articles = res.articles;
      if (this.articles)
        for (const a of this.articles) {
          JsonHelper.toAny(a, ['category']);
        }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
