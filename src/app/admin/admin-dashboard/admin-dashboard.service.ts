import {Injectable} from "@angular/core";
import {BaseService} from "../../base.service";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class AdminDashboardService extends BaseService {
  getCommentUnchecked() {
    return this.http.get(this.url.comment_managing).pipe(catchError(this.handleError));
  }
  checkComment(id: number) {
    return this.http.post(this.url.comment_managing, {id: id}).pipe(catchError(this.handleError));
  }
}
