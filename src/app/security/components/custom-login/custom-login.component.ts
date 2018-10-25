import {Component, Input, OnInit} from '@angular/core';
import {CustomAuthService} from '../../services/custom-auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiResponseBody} from '@app/security/models/api-response-body';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

@Component({
  selector: 'un-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {
  @Input() loginSuccess: () => void;
  loginUserForm: FormGroup;
  errorMessage: ApiResponseBody;
  loginPromise: any;

  constructor(private customAuthService: CustomAuthService,
              private formBuilder: FormBuilder,
              private customToastrService: CustomToastrService) {
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
      const observable = this.customAuthService.login(this.loginUserForm.value);
      this.loginPromise = observable.toPromise();
      observable.subscribe(
        loginSuccess => {
          this.loginSuccess();
        },
        loginError => {
          console.error(loginError);
          if (loginError.status !== 404) {
            this.customToastrService.showErrorToastr('Log in', 'Unable to log in, try again later', loginError.status);
          }
          this.errorMessage = JSON.parse(loginError.error);
        }
      );
    }
  }
}
