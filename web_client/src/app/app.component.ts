import {Component, Inject, Injectable, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {BaseService} from "@app-services/base.service";
import {HttpClient, HttpXsrfTokenExtractor} from "@angular/common/http";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(
    // private xsrfExtractor: HttpXsrfTokenExtractor,
  ) {
  }

  ngOnInit(): void {
  }

}
