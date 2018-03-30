import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomAuthService} from '../../services/custom-auth.service';
import {RegistrationFormValidator} from '../../validators/RegistrationFormValidator';

@Component({
  selector: 'un-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() loginSuccess: () => void;
  registrationUserForm: FormGroup;

  constructor(private customAuthService: CustomAuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registrationUserForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastname: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      passwordGroup: new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/)
        ])),
        repeatedPassword: new FormControl('', Validators.compose([
          Validators.required
        ]))
      }, RegistrationFormValidator.equalPasswordsRequired)
    });
  }

  registerUser() {
    if (this.registrationUserForm.valid) {
      this.customAuthService.login(this.registrationUserForm.value);
    }
  }
}
