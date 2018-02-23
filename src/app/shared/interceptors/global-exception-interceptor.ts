import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NotificationsService} from 'angular2-notifications';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class GlobalExceptionInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error: any) => {
        this.notificationService.error(`Exception - ${error.status}`, error.error.message, {timeOut: 100000});
        return Observable.throw(error);
      }) as any;
  }
}
