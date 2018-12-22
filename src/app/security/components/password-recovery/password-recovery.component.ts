import {Component, OnInit, ViewChild} from '@angular/core';
import {RecaptchaComponent} from 'ng-recaptcha';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@env/environment';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
@DestroySubscribers()
export class PasswordRecoveryComponent implements OnInit {
  @ViewChild(RecaptchaComponent) captchaRef: RecaptchaComponent;

  private captcha: string;

  passwordRecoveryForm: FormGroup;
  googleReCaptchaKey: string;
  promiseButton: Promise<void>;
  public subscribers: any = {};

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
      this.promiseButton = new Promise(undefined);
      const recoverData = this.passwordRecoveryForm.value;
      this.subscribers.recover = this.customAuthService.recoverPassword(recoverData).subscribe(
        recoveryPasswordSucces => {
          this.customToastrService.showSuccessToastr('Password recovery', recoveryPasswordSucces.message);
          this.promiseButton = Promise.resolve();
        },
        recoveryPasswordError => {
          console.error(recoveryPasswordError);
          this.customToastrService
            .showErrorToastr('Password recovery', 'Unable to recover, try again later', recoveryPasswordError.status);
          this.promiseButton = Promise.resolve();
        });
    }
  }
}
