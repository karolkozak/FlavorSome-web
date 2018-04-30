import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '@app/security/services/authentication.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerSettings: {[name: string]: string | string[]; } = {};
    for (const key of req.headers.keys()) {
      headerSettings[key] = req.headers.getAll(key);
    }
    const token = this.authenticationService.getToken();
    if (token) {
      headerSettings['Authorization'] = `Bearer ${token}`;
    }
    headerSettings['Content-Type'] = 'application/json';

    const headers = new HttpHeaders(headerSettings);
    const clonedRequest = req.clone({headers});
    return next.handle(clonedRequest);
  }
}
