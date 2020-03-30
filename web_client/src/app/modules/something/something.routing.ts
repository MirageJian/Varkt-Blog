import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article/article.component';
import {CategoryComponent} from './category/category.component';
import {ArticlesResolveService} from "./something-resolve.service";

const routes: Routes = [
      { path: '', component: CategoryComponent, resolve: {articles: ArticlesResolveService}},
      { path: ':id', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SomethingRoutingModule { }
