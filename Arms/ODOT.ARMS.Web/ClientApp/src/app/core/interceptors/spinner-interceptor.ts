import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from "../services/spinner.service";
import { Observable, of } from "rxjs";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  // We need to store the pending requests
  private requests: HttpRequest<any>[] = [];

  constructor(private spinnerService: SpinnerService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      // Remove the request from our array
      this.requests.splice(i, 1);
    }

    // If there are no more requests left, then hide the spinner.
    if (this.requests.length == 0)
      this.spinnerService.hide();
  }

  // This is the code that will run whenever an HttpRequest is made
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Let's store this request
    this.requests.push(req);

    // Keep firing off a show whenever a new webapi request is made */
    this.spinnerService.show();
    // We create a new observable which we return instead of the original
    return Observable.create(observer => {
      // And subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });
      // return teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
