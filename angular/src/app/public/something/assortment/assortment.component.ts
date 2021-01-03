import {Component, HostBinding, OnInit} from '@angular/core';
import {slideFromBottom} from '@const/animations';
import {SomethingService} from "../../services/something.service";
import {ListArticleModel} from "@const/models";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
  animations: [slideFromBottom()]
})
export class AssortmentComponent implements OnInit {
  @HostBinding('@slideFromBottom')
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
  }

  searchArticle(keyword: string) {
    this.router.navigate(['/something'], {queryParams: {keyword: keyword}}).then();
  }
  // use callback function to improve code reuse
  private readonly searchCallback = (res: ListArticleModel[]) => {
    if (!res) return;
    this.listArticle = res;
  };

}
