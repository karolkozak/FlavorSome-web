import {Component, Input, OnInit} from '@angular/core';
import {CustomAuthService} from '../../services/custom-auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {NotificationsService} from 'angular2-notifications';
import {ApiResponseBody} from '@app/security/models/api-response-body';

@Component({
  selector: 'un-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {
  @Input() loginSuccess: () => void;
  loginUserForm: FormGroup;
  errorMessage: ApiResponseBody;

  constructor(private customAuthService: CustomAuthService,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private customTranslateService: CustomTranslateService) {
  }

  ngOnInit() {
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required],
    });
  }

  public login() {
    if (this.loginUserForm.valid) {
      this.customAuthService.login(this.loginUserForm.value).subscribe(
        loginSuccess => {
          this.loginSuccess();
        },
        loginError => {
          console.error(loginError);
          let titleMessage = '', errorMessage = '';
          this.customTranslateService.getTranslation('Log in').subscribe(result => titleMessage = result);
          if (loginError.status !== 404) {
            this.customTranslateService.getTranslation('Unable to log in, try again later')
              .subscribe(result => errorMessage = result);
            this.notificationsService.error(`${titleMessage} - ${loginError.status}`, errorMessage);
          }
          this.errorMessage = {...JSON.parse(loginError.error)};
        }
      );
    }
  }
}
