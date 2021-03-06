import {Component, Input, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomAuthService} from '../../services/custom-auth.service';
import {RegistrationFormValidator} from '../../validators/RegistrationFormValidator';
import {squash} from '@app/shared/utils/object-utils';
import {ApiResponseBody} from '@app/security/models/api-response-body';
import {environment} from '@env/environment';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {RecaptchaComponent} from 'ng-recaptcha';
import { ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'fs-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewChecked {
  @Input() registrationSuccess: () => void;
  @ViewChild(RecaptchaComponent) captchaRef: RecaptchaComponent;

  private captcha: string;

  registrationUserForm: FormGroup;
  registrationError: ApiResponseBody;
  googleReCaptchaKey: string;
  promiseButton: Promise<void>;

  constructor(private customAuthService: CustomAuthService,
              private formBuilder: FormBuilder,
              private customToastrService: CustomToastrService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.googleReCaptchaKey = environment.googleReCaptchaKey;
    this.initForm();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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

  get form() {
    return this.registrationUserForm.controls;
  }

  formIncorrect() {
    return $('.form-control-invalid').length > 0;
  }

  captchaResolved(captchaResponse: string) {
    this.registrationUserForm.get('gRecaptchaResponse').setValue(captchaResponse);
    this.captcha = captchaResponse;
  }

  getCaptcha() {
    return new Promise(resolve => {
      if (this.captcha) {
        resolve(this.captcha);
        return;
      }

      this.captchaRef.execute();

      const resolvedCallback = this.captchaResolved;
      this.captchaResolved = function (captchaResponse: string) {
        resolvedCallback.call(this, captchaResponse);
        resolve(captchaResponse);
        this.captchaResolved = resolvedCallback;
      };
    });
  }

  async registerUser() {
    await this.getCaptcha();
    if (this.registrationUserForm.valid) {
      this.promiseButton = new Promise(undefined);
      const userData = squash(this.registrationUserForm.value);
      const observable = this.customAuthService.registerUser(userData);
      observable.subscribe(
        () => {
          this.registrationSuccess();
          this.promiseButton = Promise.resolve();
        },
        registrationError => {
          console.error(registrationError);
          if (registrationError.status !== 404) {
            this.customToastrService
              .showErrorToastr('Registration', 'Unable to register, try again later', registrationError.status);
          }
          this.registrationError = JSON.parse(registrationError.error);
          this.promiseButton = Promise.resolve();
        }
      );
    }
  }
}
