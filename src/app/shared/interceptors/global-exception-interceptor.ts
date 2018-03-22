import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NotificationsService} from 'angular2-notifications';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../security/services/authentication.service';
import {CustomTranslateService} from '../services/custom-translate.service';

@Injectable()
export class GlobalExceptionInterceptor implements HttpInterceptor {

  private titleMessage: string;
  private errorMessage: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private notificationsService: NotificationsService,
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
        this.customTranslateService
          .getTranslation(error.error.message ? error.error.message : 'Unexpected exception')
          .subscribe(result => this.errorMessage = result);
        this.notificationsService.error(`${this.titleMessage} - ${error.status}`, this.errorMessage, {timeOut: 100000});
        return Observable.throw(error);
      }) as any;
  }
}
