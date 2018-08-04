import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PoyoungAuth } from './PoyoungAuth';
import { BaseService } from './../../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResModel } from '../../shared/models';

@Injectable()
export class AuthorisationService extends BaseService {
  postPoyoungAuthInfo(auth: PoyoungAuth): any {
    const body = {
      code: auth.code,
      phone: auth.phone,
      name: auth.name,
      imei: auth.imei
    };
    // const body = JSON.stringify(json);
    const header = new HttpHeaders().set('Content-Type', 'text/plain');
    // .map(response => JSON.stringify(response));
    const url = `/apis/authorisation`;
    return this.http.post<ResModel>(url, body, {headers: header})
    .pipe(catchError(this.handleError));
  }
}
