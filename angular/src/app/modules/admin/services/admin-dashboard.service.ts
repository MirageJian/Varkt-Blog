import {Injectable} from "@angular/core";
import {BaseService} from "@app-services/base.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AdminDashboardService extends BaseService {
  getCommentUnchecked() {
    return this.http.get('/api/comment_managing').pipe(catchError(this.handleError));
  }
  checkComment(id: number) {
    return this.http.post('/api/comment_managing', {id: id}).pipe(catchError(this.handleError));
  }
}
