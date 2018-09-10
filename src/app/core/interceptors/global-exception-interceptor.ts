import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

@Injectable()
export class GlobalExceptionInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private customToastrService: CustomToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error: any) => {
        let errorMessage;
        if (error.status === 401) {
          this.authenticationService.removeTokenDataFromStorage();
          this.router.navigate(['/login']);
          errorMessage = {message: 'You have to be logged in'};
        } else {
          errorMessage = error.error instanceof Object ? error.error : JSON.parse(error.error);
        }
        errorMessage = errorMessage.message || 'Unexpected exception';
        this.customToastrService.showErrorToastr('Exception', errorMessage, error.status);
        return Observable.throw(error);
      }) as any;
  }
}
