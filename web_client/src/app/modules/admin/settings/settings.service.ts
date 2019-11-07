import { Injectable } from '@angular/core';
import {SomethingService} from "../../something/something.service";
import {CategoryModel} from "@shared/models";
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Md5} from 'ts-md5';


@Injectable({
  providedIn: 'root'
})
export class SettingsService extends SomethingService{
  addCategory(c: CategoryModel) {
    return this.http.put(this.url.category, {...c}).pipe(catchError(this.handleError));
  }
  deleteCategory(c: CategoryModel){
    const params = new HttpParams().append('id', c.id.toString());
    return this.http.delete(this.url.category, {params: params}).pipe(catchError(this.handleError));
  }
  changePassword(password) {
    password = {
      oldPassword: Md5.hashStr(password.oldPassword).toString(),
      newPassword: Md5.hashStr(password.newPassword).toString(),
      confirmedPassword: Md5.hashStr(password.confirmedPassword).toString()
    };
    return this.http.put(this.url.password, password).pipe(catchError(this.handleError));
  }
}
