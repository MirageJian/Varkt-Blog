import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', loadChildren: () => import('../modules/public/public.module').then(m => m.PublicModule)},
      {path: 'admin', loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule)},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]// 如果在导入Module中要使用router-outlet标签就必须导出
})
export class LayoutRouting {
}
