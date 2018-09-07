import { Injectable } from '@angular/core';
import {BaseService} from "../../../app-services/base.service";
import {catchError} from 'rxjs/operators';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {PyCodeModel, PyUserModel, PyRecordModel} from "../../../shared/models";

@Injectable({
  providedIn: 'root'
})
export class PoYoungService extends BaseService{
  getPyRecords(){
    return this.http.get(this.url.py_record).pipe(catchError(this.handleError));
  }

  deletePyRecord(r: PyRecordModel){
    const url = "http://58.53.196.165:8080/wf.do";
    let params = new HttpParams();
    params = params.append('code', '6');
    params = params.append('username', r.phone);
    params = params.append('clientip', r.ip);
    this.http.get(url, {params: params}).pipe(catchError(this.handleError)).subscribe();
    return this.http.delete(this.url.py_record, {params: new HttpParams().append('id', r.id.toString())});
  }

  getPyUsers(){
    return this.http.get(this.url.py_user).pipe(catchError(this.handleError));
  }

  deletePyUser(u: PyUserModel){
    let params = new HttpParams();
    params = params.append('id', u.id.toString());
    return this.http.delete(this.url.py_user, {params:params}).pipe(catchError(this.handleError));
  }

  uploadApk(formData){
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    return this.http.put(this.url.py_user,  formData, { headers: headers }).pipe(catchError(this.handleError));
  }
  getCodes(){
    return this.http.get(this.url.py_code).pipe(catchError(this.handleError))
  }
  addCode (times: number) {
    return this.http.put(this.url.py_code, {times: times}).pipe(catchError(this.handleError));
  }
  deleteCode(obj: PyCodeModel){
    let params = new HttpParams().append('id', obj.id.toString());
    return this.http.delete(this.url.py_code, {params: params}).pipe(catchError(this.handleError));
  }
}
