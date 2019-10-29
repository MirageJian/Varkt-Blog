import { Injectable } from '@angular/core';
import {JsonHelper} from "@shared/tools";
import {catchError} from "rxjs/operators";
import {AboutModel} from "@shared/models/about.model";
import {AboutService} from "../../about/about.service";

@Injectable({
  providedIn: 'root'
})
export class AboutManagingService extends AboutService {

  putAbout(model: AboutModel) {
    const body = {...model} as AboutModel;
    JsonHelper.toJson(body, JsonHelper.ABOUT_MEMBER);
    return this.http.put(this.url.about, body).pipe(catchError(this.handleError));
  }
}
