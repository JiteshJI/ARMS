import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError} from "rxjs";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      /* If any time we get an error with status codes 401 (Unauthorized) or 403 (Forbidden), then redirect the user to the Unauthorized page */
      if (err.status === 401 || err.status == 403) {
        // redirect to unauthorized page
        
      }
      return throwError(err.error);
    }))
  }
}
