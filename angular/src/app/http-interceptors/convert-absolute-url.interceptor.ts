import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {isPlatformServer} from "@angular/common";
import {LOCAL_API_BASE} from '@const/app-const';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ConvertAbsoluteUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    // const secureReq = req.clone({
    //   url: req.url.replace('http://', 'https://')
    // });
    // Convert relative url to absolute url
    if (isPlatformServer(this.platformId)) {
      return next.handle(req.clone({url: LOCAL_API_BASE + req.url}));
    }
    // send the cloned, "secure" request to the next handler.
    return next.handle(req);
  }
}


