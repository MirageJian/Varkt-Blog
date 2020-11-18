import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {BaseService} from "./base.service";

@Injectable()
export class FileUploadService extends BaseService{

  uploadArticleImage(file: File) {
    const formData = new FormData();
    formData.append('imgUpload', file, file.name);
    return this.http.post('/api/image', formData).pipe(catchError(this.handleError));
  }
}
