import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BaseService} from "@app-services/base.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ListArticleModel} from "@shared/models";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SomethingService} from "../something/something.service";

@Injectable({
  providedIn: 'root'
})
export class HomepageService extends BaseService implements Resolve<ListArticleModel[]>{
  constructor(http: HttpClient, @Inject(PLATFORM_ID) platformId, private _somethingService: SomethingService) {
    super(http, platformId);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListArticleModel[]> | Promise<ListArticleModel[]> | ListArticleModel[] {
    return this._somethingService.getAllArticles();
  }

  getChips(articles: ListArticleModel[]) {
    const chips = new Set<string>();
    for (let a of articles) for (let c of a.category) chips.add(c);
    return chips;
  }
}
