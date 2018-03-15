import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../security/services/authentication.service';
import {Injectable} from '@angular/core';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.authenticationService.getToken()}`);
    const clonedRequest = req.clone({headers});
    return next.handle(clonedRequest);
  }
}
