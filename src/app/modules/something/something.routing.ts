import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article/article.component';
import { AssortmentComponent } from './category/assortment/assortment.component';
import {ListArticlesComponent} from './category/list-articles/list-articles.component';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
      { path: '', component: CategoryComponent },
      { path: ':id', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SomethingRoutingModule { }
