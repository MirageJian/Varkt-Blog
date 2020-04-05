import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./article.component";
import {ArticleService} from "./article.service";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', redirectTo:'/error-page', pathMatch: 'full'},
      {path: ':id', component: ArticleComponent, resolve: {data: ArticleService}}
    ])
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule {
}
