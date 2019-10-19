import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule'},
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}, // here need 404 page
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    // { enableTracing: true } // <-- debugging purposes only),
  ],
  exports: [RouterModule]// 如果在导入Module中要使用router-outlet标签就必须导出
})
export class AppRoutingModule { }
