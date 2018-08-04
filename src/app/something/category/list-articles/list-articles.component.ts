import {Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges} from '@angular/core';
import {SomethingService} from '../../something.service';
import {ListArticleModel} from '../../../shared/models';
import {ActivatedRoute} from '@angular/router';
import {JsonHelperTool} from "../../../shared/tools/json-helper.tool";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit, OnChanges {
  @Input() private label: string;
  articles: ListArticleModel[];

  constructor(
    private route: ActivatedRoute,
    private somethingService: SomethingService,
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.somethingService.getListArticle(this.label).subscribe(res => {
      this.articles = res;
      for (const a of this.articles) {
        JsonHelperTool.toAny(a, ['category']);
      }
    });
    console.log(changes);
  }
}
