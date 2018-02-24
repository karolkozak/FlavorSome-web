import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../security/services/authentication.service';

@Injectable()
export class GlobalExceptionInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error: any) => {
        if (error.status === 401) {
          this.authenticationService.removeTokenFromStorage();
          this.router.navigate(['/login']);
        }
        console.error(error.status);
        console.error(error.error.message);
        return Observable.throw(error);
      }) as any;
  }
}
