import {Component, OnInit} from '@angular/core';
import {BaseService} from "../app-services/base.service";

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: [`
    app-navbar {
      flex: 0 0 auto;
    }`],
})
export class LayoutComponent implements OnInit {

  constructor(
    private baseService: BaseService,
  ) {
  }

  ngOnInit() {
    this.baseService.getCookie().subscribe();
  }
}
