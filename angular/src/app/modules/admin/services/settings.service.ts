import {Injectable} from '@angular/core';
import {SomethingService} from "../../public/services/something.service";
import {CategoryModel} from "@shared/models";
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Md5} from 'ts-md5';
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class SettingsService extends SomethingService{
  addCategory(c: CategoryModel) {
    return this.http.post('/api/category', {...c}).pipe(catchError(this.handleError));
  }
  deleteCategory(c: CategoryModel){
    const params = new HttpParams().append('id', c.id.toString());
    return this.http.delete('/api/category', {params: params}).pipe(catchError(this.handleError));
  }
  changePassword(formGroup: FormGroup) {
    const passwordBody = {
      oldPassword: Md5.hashStr(formGroup.get('oldPassword').value).toString(),
      newPassword: Md5.hashStr(formGroup.get('newPassword').value).toString(),
      confirmedPassword: Md5.hashStr(formGroup.get('confirmedPassword').value).toString()
    };
    return this.http.put('/api/password', passwordBody).pipe(catchError(this.handleError));
  }
}
