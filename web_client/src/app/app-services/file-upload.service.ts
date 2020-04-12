import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends BaseService{

  uploadArticleImage(file: File) {
    const formData = new FormData();
    formData.append('imgUpload', file, file.name);
    return this.http.post(this.url.image, formData).pipe(catchError(this.handleError));
  }
}
