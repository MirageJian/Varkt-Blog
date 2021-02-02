import {Injectable, Injector} from '@angular/core';
import {BaseService} from '../../layout/services/base.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SimpleArticleModel} from '@const/models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SomethingService} from './something.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageService extends BaseService implements Resolve<SimpleArticleModel[]>{
  constructor(http: HttpClient, injector: Injector, private _somethingService: SomethingService) {
    super(http, injector);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SimpleArticleModel[]> | Promise<SimpleArticleModel[]> | SimpleArticleModel[] {
    return this._somethingService.getAllArticles();
  }

  getChips(articles: SimpleArticleModel[]) {
    const chips = new Set<string>();
    for (const a of articles) for (const c of a.category) chips.add(c);
    return chips;
  }
}
