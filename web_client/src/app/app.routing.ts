import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
  {path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
  {path: 'error-page', component: ErrorPageComponent},
  // {path: '**', component: ErrorPageComponent}, // here need 404 page
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      // enableTracing: true  // <-- debugging purposes only)
    })
  ],
  exports: [RouterModule]// 如果在导入Module中要使用router-outlet标签就必须导出
})
export class AppRoutingModule {
}
