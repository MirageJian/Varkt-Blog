import { AssortmentComponent } from './category/assortment/assortment.component';
import { ArticleComponent } from './article/article.component';
import { SomethingService } from './something.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SomethingRoutingModule } from './something.routing';
import { ListArticlesComponent } from './category/list-articles/list-articles.component';
import { CategoryComponent } from './category/category.component';
import {ArticleResolveService, ArticlesResolveService} from "./something-resolve.service";


@NgModule({
  imports: [
    SharedModule,
    SomethingRoutingModule,
  ],
  exports: [],
  declarations: [
    ArticleComponent,
    AssortmentComponent,
    ListArticlesComponent,
    CategoryComponent
  ],
  providers: [
    SomethingService,
    ArticlesResolveService,
    ArticleResolveService
  ],
})
export class SomethingModule { }
