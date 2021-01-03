/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {NoopInterceptor} from './noop.interceptor';
import {ConvertAbsoluteUrlInterceptor} from "./convert-absolute-url.interceptor";

// Angular 会按照你提供它们的顺序应用这些拦截器。
// 如果你提供拦截器的顺序是先 A，再 B，再 C，那么请求阶段的执行顺序就是 A->B->C，而响应阶段的执行顺序则是 C->B->A。

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ConvertAbsoluteUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
];
