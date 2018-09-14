import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends BaseService{

  uploadArticleImage(file: File, folder: string) {
    const formData = new FormData();
    formData.append('imgUpload', file, file.name);
    let params = new HttpParams().append('folder', folder);
    return this.http.post(this.url.image, formData, {params: params}).pipe(catchError(this.handleError));
  }
}
