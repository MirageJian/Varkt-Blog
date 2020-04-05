import {Injectable} from "@angular/core";
import {SomethingService} from "./something.service";
import {ActivatedRouteSnapshot, ParamMap, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {CategoryModel, ListArticleModel} from "@shared/models";

@Injectable()
export class ArticlesResolveService implements Resolve<ListArticleModel[]> {
  constructor(private something: SomethingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListArticleModel[]> | Promise<ListArticleModel[]> | ListArticleModel[] {
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


