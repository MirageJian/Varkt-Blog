import {Injectable} from "@angular/core";
import {SomethingService} from "./something.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {CategoryModel, ListArticleModel} from "@shared/models";

// @Injectable()
// export class SomethingResolveService implements Resolve<CategoryModel[]> {
//   constructor(private something: SomethingService) {
//   }
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoryModel[]> | Promise<CategoryModel[]> | CategoryModel[] {
//     return this.something.getListCategory();
//   }
// }

@Injectable()
export class ArticlesResolveService implements Resolve<ListArticleModel[]> {
  constructor(private something: SomethingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListArticleModel[]> | Promise<ListArticleModel[]> | ListArticleModel[] {
    const param = route.params['label'];

    return param ? this.something.getListArticle(param) : EMPTY;
  }
}
