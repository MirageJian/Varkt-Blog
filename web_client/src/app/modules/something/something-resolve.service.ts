import {Injectable} from "@angular/core";
import {SomethingService} from "./something.service";
import {ActivatedRouteSnapshot, ParamMap, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {ArticleModel, CategoryModel, ListArticleModel} from "@shared/models";
import {switchMap} from "rxjs/operators";

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

@Injectable()
export class ArticleResolveService implements Resolve<ArticleModel[]> {
  constructor(private something: SomethingService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleModel[]> | Promise<ArticleModel[]> | ArticleModel[] {
    const param = +route.params['id'];
    if (!param) this.router.navigate(['/error-page']).then();
    return this.something.getArticle(param);
  }
}

