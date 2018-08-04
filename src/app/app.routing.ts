import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: './general/general.module#GeneralModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: 'something', loadChildren: './something/something.module#SomethingModule'},
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}, // here need 404 page
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only),
    )],
  exports: [RouterModule]// 如果在导入Module中要使用router-outlet标签就必须导出
})
export class AppRoutingModule { }
