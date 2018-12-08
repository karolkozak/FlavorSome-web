import {Component, OnInit, ViewChild} from '@angular/core';
import {RecaptchaComponent} from 'ng-recaptcha';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@env/environment';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {CustomAuthService} from '@app/security/services/custom-auth.service';

@Component({
  selector: 'fs-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  @ViewChild(RecaptchaComponent) captchaRef: RecaptchaComponent;

  private captcha: string;

  passwordRecoveryForm: FormGroup;
  googleReCaptchaKey: string;
  promiseButton: any;

  constructor(private formBuilder: FormBuilder,
              private customToastrService: CustomToastrService,
              private customAuthService: CustomAuthService) {
  }

  ngOnInit(): void {
    this.googleReCaptchaKey = environment.googleReCaptchaKey;
    this.initForm();
  }

  private initForm() {
    this.passwordRecoveryForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      gRecaptchaResponse: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }

  get formIncorrect(): boolean {
    return this.passwordRecoveryForm.invalid && this.passwordRecoveryForm.touched;
  }

  captchaResolved(captchaResponse: string) {
    this.passwordRecoveryForm.get('gRecaptchaResponse').setValue(captchaResponse);
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

  async recoverPassword() {
    await this.getCaptcha();
    if (this.passwordRecoveryForm.valid) {
      const recoverData = this.passwordRecoveryForm.value;
      const observable = this.customAuthService.recoverPassword(recoverData);
      this.promiseButton = observable.toPromise();
      observable.subscribe(
        recoveryPasswordSucces => {
          this.customToastrService.showSuccessToastr('Password recovery', recoveryPasswordSucces.message);
        },
        recoveryPasswordError => {
          console.error(recoveryPasswordError);
          this.customToastrService
            .showErrorToastr('Password recovery', 'Unable to recover, try again later', recoveryPasswordError.status);
        });
    }
  }
}
