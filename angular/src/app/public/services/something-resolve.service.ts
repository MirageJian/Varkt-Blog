import {HttpClient} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CategoryModel, SimpleArticleModel} from '@const/models';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseService} from '../../layout/services/base.service';
import {SomethingService} from './something.service';

@Injectable()
export class ArticlesResolveService extends BaseService implements Resolve<SimpleArticleModel[]> {
  constructor(private something: SomethingService, http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SimpleArticleModel[]> | Promise<SimpleArticleModel[]> | SimpleArticleModel[] {
    const param = route.params.id;
    return param ? this.something.getListArticle(param).pipe(catchError(this.handlePageError)) : EMPTY;
  }
}

@Injectable()
export class CategoriesResolveService extends BaseService implements Resolve<CategoryModel[]> {
  constructor(private something: SomethingService, http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CategoryModel[]> | Promise<CategoryModel[]> | CategoryModel[] {
    return this.something.getListCategory().pipe(catchError(this.handlePageError));
  }
}
