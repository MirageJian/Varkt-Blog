import {Injectable} from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BaseService} from "../../layout/services/base.service";
import {Observable} from "rxjs";
import {FileStatModel} from "@const/models";

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

  getPublicFiles(): Observable<FileStatModel[]> {
    return this.http.get<FileStatModel[]>('/api/public_files').pipe(catchError(this.handleError));
  }

  deletePublicFile(filename: string) {
    let params = new HttpParams();
    params = params.append('filename', filename);
    return this.http.delete('/api/public_files', {params: params}).pipe(catchError(this.handleError));
  }
}
