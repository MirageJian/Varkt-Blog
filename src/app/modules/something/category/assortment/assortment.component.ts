import { Component, OnInit, HostBinding } from '@angular/core';
import {slideFromBottom, routeAnimation} from '@shared/animations';
import {SomethingService} from "../../something.service";
import {ListArticleModel} from "@shared/models";
import {JsonHelper} from "@shared/tools";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ToolsService} from "@app-services/tools.service";

@Component({
  selector: 'app-assortment',
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
  animations: [slideFromBottom(), routeAnimation]
})
export class AssortmentComponent implements OnInit {
  @HostBinding('@routeAnimation')
  @HostBinding('style.display') display = 'block';
  keyword = '';
  listArticle: ListArticleModel[];

  constructor(
    private somethingService: SomethingService,
    private route: ActivatedRoute,
    public tools: ToolsService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(switchMap((paramMap: ParamMap) => {
      this.keyword = paramMap.get('keyword');
      return this.somethingService.getSearchResult(this.keyword);
    })).subscribe(this.searchCallback)
  }

  searchArticle(keyword: string) {
    this.listArticle = null;
    this.somethingService.getSearchResult(keyword).subscribe(this.searchCallback);
  }
  // use callback function to improve code reuse
  private readonly searchCallback = (res: ListArticleModel[]) => {
    if (!res) return;
    this.listArticle = res;
    for (const a of this.listArticle) {
      JsonHelper.toAny(a, ['category']);
    }
  };

}
