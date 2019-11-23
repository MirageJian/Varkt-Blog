import { catchError } from 'rxjs/operators';
import { PoyoungAuth } from './authorization/PoyoungAuth';
import { BaseService } from '@app-services/base.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResModel } from '@shared/models';

@Injectable()
export class AuthorizationService extends BaseService {
  postPoyoungAuthInfo(auth: PoyoungAuth) {
    const body = {
      code: auth.code,
      phone: auth.phone,
      name: auth.name,
      imei: auth.imei
    };
    // const body = JSON.stringify(json);
    const header = new HttpHeaders().set('Content-Type', 'text/plain');
    // .map(response => JSON.stringify(response));
    return this.http.post<ResModel>(this.url.py_user, body, {headers: header})
    .pipe(catchError(this.handleError));
  }
}
