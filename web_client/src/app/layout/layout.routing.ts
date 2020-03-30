import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {AboutResolveService} from "../modules/about/about.resolve.service";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', loadChildren: () => import('../modules/homepage/homepage.module').then(m => m.HomepageModule)},
      {path: 'about', loadChildren: () => import('../modules/about/about.module').then(m => m.AboutModule)},
      {path: 'login', loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule)},
      {path: 'admin', loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule)},
      {path: 'something', loadChildren: () => import('../modules/something/something.module').then(m => m.SomethingModule)},
    ]
  },
  {path: 'authorization', loadChildren: () => import('../modules/authorization/authorization.module').then((m => m.AuthorizationModule))},
  {path: 'error-page', component: ErrorPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )],
  exports: [RouterModule]// 如果在导入Module中要使用router-outlet标签就必须导出
})
export class LayoutRouting {
}
