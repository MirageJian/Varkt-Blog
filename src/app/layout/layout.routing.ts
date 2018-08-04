import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', loadChildren: '../modules/dashboard/dashboard.module#DashboardModule'},
      {path: 'about', loadChildren: '../modules/about/about.module#AboutModule'},
      {path: 'login', loadChildren: '../modules/login/login.module#LoginModule'},
      {path: 'admin', loadChildren: '../modules/admin/admin.module#AdminModule'},
      {path: 'something', loadChildren: '../modules/something/something.module#SomethingModule'},
    ]
  },
  {path: 'authorisation', loadChildren: '../modules/authorisation/authorisation.module#AuthorisationModule'},
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
