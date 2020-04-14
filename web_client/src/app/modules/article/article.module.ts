import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./article.component";
import {ArticleService} from "./article.service";
import {SharedModule} from "@shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
