import {Injectable} from "@angular/core";
import {SomethingService} from "./something.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {CategoryModel, SimpleArticleModel} from "@const/models";

@Injectable()
export class ArticlesResolveService implements Resolve<SimpleArticleModel[]> {
  constructor(private something: SomethingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SimpleArticleModel[]> | Promise<SimpleArticleModel[]> | SimpleArticleModel[] {
    const param = route.params['id'];
    return param ? this.something.getListArticle(param) : EMPTY;
  }
}

@Injectable()
export class CategoriesResolveService implements Resolve<CategoryModel[]> {
  constructor(private something: SomethingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoryModel[]> | Promise<CategoryModel[]> | CategoryModel[] {
    return this.something.getListCategory();
  }
}


