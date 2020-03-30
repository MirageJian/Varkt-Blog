import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArticleComponent} from './article/article.component';
import {CategoryComponent} from './category/category.component';
import {ArticlesResolveService, ArticleResolveService} from "./something-resolve.service";

const routes: Routes = [
  {path: '', component: CategoryComponent, resolve: {articles: ArticlesResolveService}},
  {path: ':id', component: ArticleComponent, resolve: {data: ArticleResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SomethingRoutingModule {
}
