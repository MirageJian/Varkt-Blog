import {BaseService} from './base.service';
import {Component, OnInit} from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    app-navbar {
      flex: 0 0 auto;
    }`],
})
export class AppComponent implements OnInit {

  constructor(
    private baseService: BaseService,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.baseService.getCookie().subscribe();
  }
}
