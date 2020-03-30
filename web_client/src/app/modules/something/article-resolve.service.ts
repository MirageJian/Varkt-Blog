import {Injectable} from "@angular/core";
import {SomethingService} from "./something.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {ArticleModel} from "@shared/models";

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
export class ArticleResolveService implements Resolve<ArticleModel[]> {
  constructor(private something: SomethingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleModel[]> | Promise<ArticleModel[]> | ArticleModel[] {
    const param = route.params['label'];

    return param ? this.something.getArticle(param) : EMPTY;
  }
}
