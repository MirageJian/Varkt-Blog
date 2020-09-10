import {AssortmentComponent} from './assortment/assortment.component';
import {SomethingService} from './something.service';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {ListArticlesComponent} from './list-articles/list-articles.component';
import {CategoryComponent} from './category.component';
import {ArticlesResolveService, CategoriesResolveService} from "./something-resolve.service";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: CategoryComponent, resolve: {categories: CategoriesResolveService}, children: [
        {path: '', component: AssortmentComponent},
        {path: ':id', component: ListArticlesComponent, resolve: {articles: ArticlesResolveService}}
      ]},
    ])
  ],
  exports: [RouterModule, ListArticlesComponent],
  declarations: [
    AssortmentComponent,
    ListArticlesComponent,
    CategoryComponent
  ],
  providers: [
    SomethingService,
    CategoriesResolveService,
    ArticlesResolveService,
  ],
})
export class SomethingModule {
}
