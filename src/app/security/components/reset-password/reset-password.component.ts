import {Component, Input, OnInit} from '@angular/core';
import {RegistrationFormValidator} from '@app/security/validators/RegistrationFormValidator';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {squash} from '@app/shared/utils/object-utils';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'fs-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Input() email: string;
  @Input() token: string;
  resetPasswordForm: FormGroup;
  promiseButton: Promise<void>;

  constructor(private router: Router,
              private customAuthService: CustomAuthService,
              private formBuilder: FormBuilder,
              private customToastrService: CustomToastrService) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      passwordGroup: new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/)
        ])),
        repeatedPassword: new FormControl('', Validators.compose([
          Validators.required
        ]))
      }, RegistrationFormValidator.equalPasswordsRequired),
    });
  }

  get passwordIncorrect(): boolean {
    const passwordInputControl = this.resetPasswordForm.get('passwordGroup').get('password');
    return passwordInputControl.invalid && passwordInputControl.dirty;
  }

  get passwordsNotEquals(): boolean {
    const passwords = this.resetPasswordForm.get('passwordGroup');
    return passwords.invalid && passwords.dirty;
  }

  get formIncorrect(): boolean {
    return this.resetPasswordForm.invalid && this.resetPasswordForm.touched;
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.promiseButton = new Promise(undefined);
      const resetData = {...squash(this.resetPasswordForm.value), token: this.token};
      const observable = this.customAuthService.resetPassword(resetData);
      observable.subscribe(
        resetPasswordSuccess => {
          this.customToastrService.showSuccessToastr('Password recovery', resetPasswordSuccess.message);
          this.router.navigate(['/login']);
          this.promiseButton = Promise.resolve();
        }
      );
    }
  }
}
