import { Injectable } from '@angular/core';
import {BaseService} from "@app-services/base.service";
import {catchError} from "rxjs/operators";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AboutModel} from "@shared/models/about.model";
import {AboutService} from "./about.service";

@Injectable({
  providedIn: 'root'
})
export class AboutResolveService  {
  constructor(private about: AboutService) {
  }



}
