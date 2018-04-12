import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomAuthService} from '../../services/custom-auth.service';
import {RegistrationFormValidator} from '../../validators/RegistrationFormValidator';
import {squash} from '@app/shared/utils/object-utils';
import {NotificationsService} from 'angular2-notifications';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {ApiResponseBody} from '@app/security/models/api-response-body';

@Component({
  selector: 'un-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() registrationSuccess: () => void;
  registrationUserForm: FormGroup;
  registrationError: ApiResponseBody;

  constructor(private customAuthService: CustomAuthService,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private customTranslateService: CustomTranslateService) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registrationUserForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      passwordGroup: new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*!@#$%^&*\)\(+=._-)[a-zA-Z\d!@#$%^&*)(+=._-]{8,}$/)
        ])),
        repeatedPassword: new FormControl('', Validators.compose([
          Validators.required
        ]))
      }, RegistrationFormValidator.equalPasswordsRequired)
    });
  }

  get passwordIncorrect(): boolean {
    const passwordInputControl = this.registrationUserForm.get('passwordGroup').get('password');
    return passwordInputControl.invalid && passwordInputControl.dirty;
  }

  get passwordsNotEquals(): boolean {
    const passwords = this.registrationUserForm.get('passwordGroup');
    return passwords.invalid && passwords.dirty;
  }

  get formIncorrect(): boolean {
    return this.registrationUserForm.invalid && this.registrationUserForm.touched;
  }

  registerUser() {
    if (this.registrationUserForm.valid) {
      const userData = squash(this.registrationUserForm.value);
      this.customAuthService.registerUser(userData).subscribe(
        loginSuccess => {
          this.registrationSuccess();
        },
        loginError => {
          console.error(loginError);
          let titleMessage = '', errorMessage = '';
          this.customTranslateService.getTranslation('Registration').subscribe(result => titleMessage = result);
          if (loginError.status !== 404) {
            this.customTranslateService.getTranslation('Unable to register, try again later')
              .subscribe(result => errorMessage = result);
            this.notificationsService.error(`${titleMessage} - ${loginError.status}`, errorMessage);
          }
          this.registrationError = JSON.parse(loginError.error);
        }
      );
    }
  }
}
