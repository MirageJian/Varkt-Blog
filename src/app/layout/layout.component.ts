import {Component, OnInit} from '@angular/core';
import {BaseService} from "../app-services/base.service";
import {ErrorPageEnum} from "./error-page/error-page.enum";
import {Router} from "@angular/router";

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
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.baseService.getCookie().subscribe(() =>{}, error1 => {
      // redirect to error page
      this.router.navigate(['/error-page', {type: ErrorPageEnum.notResponded}]).then();
    }
  );
  }
}
