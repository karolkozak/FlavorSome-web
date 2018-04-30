import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CustomTranslateService} from '../services/custom-translate.service';
import {ApiResponseBody} from '@app/security/models/api-response-body';

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
        if (error.status === 401) {
          this.authenticationService.removeTokenDataFromStorage();
          this.router.navigate(['/login']);
        }
        this.customTranslateService.getTranslation('Exception').subscribe(result => this.titleMessage = result);
        const errorMessage: ApiResponseBody = JSON.parse(error.error);
        this.customTranslateService
          .getTranslation(errorMessage.message || 'Unexpected exception')
          .subscribe(result => this.errorMessage = result);
        this.toastr.error(`${this.titleMessage} - ${error.status}`, this.errorMessage);
        return Observable.throw(error);
      }) as any;
  }
}
