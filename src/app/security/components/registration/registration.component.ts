import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomAuthService} from '../../services/custom-auth.service';
import {RegistrationFormValidator} from '../../validators/RegistrationFormValidator';
import {squash} from '@app/shared/utils/object-utils';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {ApiResponseBody} from '@app/security/models/api-response-body';
import {environment} from '@env/environment';
import {ReCaptchaComponent} from 'angular5-recaptcha';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import * as $ from 'jquery';

@Component({
  selector: 'un-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  @Input() registrationSuccess: () => void;
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  registrationUserForm: FormGroup;
  registrationError: ApiResponseBody;
  googleReCaptchaKey: string;
  availableCultureLanguages: Array<string>;

  constructor(private customAuthService: CustomAuthService,
              private formBuilder: FormBuilder,
              private customToastrService: CustomToastrService,
              private customTranslateService: CustomTranslateService) {
  }

  ngAfterViewInit() {
    setTimeout(function() {
      let htmlInner = $('jhi-re-captcha')[0].innerHTML.replace('304px', 'inherit');
      htmlInner = htmlInner.replace('78px', 'inherit');
      $('jhi-re-captcha').html(htmlInner);
      $('jhi-re-captcha').addClass('visible');
      if (window.innerWidth < 768) {
        $('jhi-re-captcha').attr('data-size', 'compact');
      }
    }, 600);
  }

  ngOnInit() {
    this.googleReCaptchaKey = environment.googleReCaptchaKey;
    this.availableCultureLanguages = this.customTranslateService.getAvailableCultureLanguages();
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
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/)
        ])),
        repeatedPassword: new FormControl('', Validators.compose([
          Validators.required
        ]))
      }, RegistrationFormValidator.equalPasswordsRequired),
      gRecaptchaResponse: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }

  get currentLanguage(): string {
    return this.availableCultureLanguages.find(v => v.startsWith(this.customTranslateService.getCurrentLanguage()));
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
    if (this.registrationUserForm.valid && this.captcha.getResponse()) {
      const userData = squash(this.registrationUserForm.value);
      this.customAuthService.registerUser(userData).subscribe(
        loginSuccess => {
          this.registrationSuccess();
        },
        loginError => {
          console.error(loginError);
          if (loginError.status !== 404) {
            this.customToastrService
              .showErrorToastr('Registration', 'Unable to register, try again later', loginError.status);
          }
          this.registrationError = JSON.parse(loginError.error);
        }
      );
    }
  }
}
