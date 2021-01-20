import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('../public/public.module').then(m => m.PublicModule)},
  {path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
  {path: 'error-page', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent}, // here need 404 page
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]// 如果在导入Module中要使用router-outlet标签就必须导出
})
export class AppLayoutRouting {
}
