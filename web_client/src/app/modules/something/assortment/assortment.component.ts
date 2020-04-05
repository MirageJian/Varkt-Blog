import { Component, OnInit, HostBinding } from '@angular/core';
import {slideFromBottom, routeAnimation} from '@shared/animations';
import {SomethingService} from "../something.service";
import {ListArticleModel} from "@shared/models";
import {JsonHelper} from "@shared/tools";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

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
    private _somethingService: SomethingService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(switchMap((paramMap: ParamMap) => {
      this.keyword = paramMap.get('keyword');
      return this._somethingService.getSearchResult(this.keyword);
    })).subscribe(this.searchCallback);
    // Set label for header
    this._somethingService.label = 'Filter';
  }

  searchArticle(keyword: string) {
    this.router.navigate(['/something'], {queryParams: {keyword: keyword}}).then();
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