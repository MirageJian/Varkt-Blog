import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {HomepageService} from './services/homepage.service';
import {AboutComponent} from './about/about.component';
import {AboutService} from './services/about.service';
import {ArticleComponent} from './article/article.component';
import {ArticleService} from './services/article.service';
import {LoginComponent} from './login/login.component';
import {CategoryComponent} from './something/category.component';
import {ArticlesResolveService, CategoriesResolveService} from './services/something-resolve.service';
import {AssortmentComponent} from './something/assortment/assortment.component';
import {ListArticlesComponent} from './something/list-articles/list-articles.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: HomepageComponent, resolve: {data: HomepageService}},
    {path: 'about', component: AboutComponent, resolve: {data: AboutService}},
    {path: 'article', redirectTo: '/error-page', pathMatch: 'full'},
    {path: 'article/:id', component: ArticleComponent, resolve: {data: ArticleService}},
    {path: 'login', component: LoginComponent},
    {
      path: 'something', component: CategoryComponent, resolve: {categories: CategoriesResolveService}, children: [
        {path: '', component: AssortmentComponent},
        {path: ':id', component: ListArticlesComponent, resolve: {articles: ArticlesResolveService}}
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PublicRouting {}
