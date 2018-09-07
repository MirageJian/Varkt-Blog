import { Injectable } from '@angular/core';
import {SomethingService} from "../../something/something.service";
import {CategoryModel} from "../../../shared/models";
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {JsonHelper} from "../../../shared/tools";

@Injectable({
  providedIn: 'root'
})
export class SettingService extends SomethingService{
  addCategory(c: CategoryModel) {
    return this.http.put(this.url.category, {...c}).pipe(catchError(this.handleError));
  }
  deleteCategory(c: CategoryModel){
    const params = new HttpParams().append('id', c.id.toString());
    return this.http.delete(this.url.category, {params: params}).pipe(catchError(this.handleError));
  }
}
