import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BaseService} from "../../layout/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class PublicFilesService extends BaseService {

  uploadFiles(formData) {
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    return this.http.post('/api/public_files',  formData, { headers: headers }).pipe(catchError(this.handleError));
  }

  getPublicFiles() {
    return this.http.get('/api/public_files').pipe(catchError(this.handleError));
  }
}
