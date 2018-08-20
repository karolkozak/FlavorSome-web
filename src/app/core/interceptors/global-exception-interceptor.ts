import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CustomTranslateService} from '../services/custom-translate.service';

@Injectable()
export class GlobalExceptionInterceptor implements HttpInterceptor {

  private titleMessage: string;
  private errorMessage: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService,
              private customTranslateService: CustomTranslateService) {
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
          errorMessage = JSON.parse(error.error);
        }
        this.customTranslateService.getTranslation('Exception').subscribe(result => this.titleMessage = result);
        this.customTranslateService
          .getTranslation(errorMessage.message || 'Unexpected exception')
          .subscribe(result => this.errorMessage = result);
        this.toastr.error(this.errorMessage, `${this.titleMessage} - ${error.status}`);
        return Observable.throw(error);
      }) as any;
  }
}
