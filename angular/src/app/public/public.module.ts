import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {HomepageService} from "./services/homepage.service";
import {SomethingService} from "./services/something.service";
import {AboutComponent} from "./about/about.component";
import {AboutService} from "./services/about.service";
import {ArticleComponent} from "./article/article.component";
import {ArticleService} from "./services/article.service";
import {LoginComponent} from "./login/login.component";
import {CategoryComponent} from "./something/category.component";
import {ArticlesResolveService, CategoriesResolveService} from "./services/something-resolve.service";
import {AssortmentComponent} from "./something/assortment/assortment.component";
import {ListArticlesComponent} from "./something/list-articles/list-articles.component";
import {FormsModule} from "@angular/forms";
import {PublicRouting} from "./public.routing";


@NgModule({
  declarations: [
    HomepageComponent,
    AboutComponent,
    ArticleComponent,
    LoginComponent,
    AssortmentComponent,
    ListArticlesComponent,
    CategoryComponent
  ],
  providers: [
    HomepageService,
    SomethingService,
    AboutService,
    ArticleService,
    SomethingService,
    CategoriesResolveService,
    ArticlesResolveService,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PublicRouting
  ],
  exports: [RouterModule, ListArticlesComponent],
})
export class PublicModule {
}
