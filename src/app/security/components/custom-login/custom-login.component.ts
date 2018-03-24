import {Component, Input, OnInit} from '@angular/core';
import {CustomAuthService} from '../../services/custom-auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'un-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {
  @Input() loginSuccess: () => void;
  loginUserForm: FormGroup;

  constructor(private customAuthService: CustomAuthService, private formBuilder: FormBuilder) {
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
      this.customAuthService.login(this.loginUserForm.value).then(loginSuccess => {
        if (loginSuccess) {
          this.loginSuccess();
        }
      });
    }
  }
}
