import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BaseService} from "@app-services/base.service";

@Injectable({
  providedIn: 'root'
})
export class PublicFilesService extends BaseService {

  uploadFiles(formData) {
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    return this.http.post(this.url.publicFiles,  formData, { headers: headers }).pipe(catchError(this.handleError));
  }

  getPublicFiles() {
    return this.http.get(this.url.publicFiles).pipe(catchError(this.handleError));
  }
}
