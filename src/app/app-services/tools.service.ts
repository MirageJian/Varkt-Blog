import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private router: Router
  ) { }

  get backUrl() {
    return this.router.url;
  }
}
