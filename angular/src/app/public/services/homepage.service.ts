import {Injectable, Injector} from '@angular/core';
import {BaseService} from '../../layout/services/base.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ListArticleModel} from '@const/models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SomethingService} from './something.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageService extends BaseService implements Resolve<ListArticleModel[]>{
  constructor(http: HttpClient, injector: Injector, private _somethingService: SomethingService) {
    super(http, injector);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListArticleModel[]> | Promise<ListArticleModel[]> | ListArticleModel[] {
    return this._somethingService.getAllArticles();
  }

  getChips(articles: ListArticleModel[]) {
    const chips = new Set<string>();
    for (const a of articles) for (const c of a.category) chips.add(c);
    return chips;
  }
}
