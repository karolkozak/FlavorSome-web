import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AboutService} from '@app/core/services/about.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {AboutMessage} from '@app/layouts/models/about-message';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'fs-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  messageForm: FormGroup;
  formError = false;
  promiseButton: Promise<void>;

  constructor(private formBuilder: FormBuilder,
              private aboutService: AboutService,
              private customToastrService: CustomToastrService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private customTitleService: CustomTitleService) {
  }

  ngOnInit() {
    this.customTitleService.setTitle(CONST_TITLES.ABOUT);
    this.messageForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      content: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.setDefaultValues();
  }

  private setDefaultValues() {
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(user => {
        this.messageForm.setValue({email: user.email, content: ''});
      });
    } else {
      this.messageForm.setValue({email: '', content: ''});
    }
  }

  sendMessage() {
    if (this.messageForm.valid) {
      this.promiseButton = new Promise(undefined);
      this.formError = false;
      const observable = this.aboutService.sendMessage(this.messageForm.value as AboutMessage);
      observable.subscribe(() => {
        this.customToastrService.showSuccessToastr('Success', 'Your message has been successfully sent!');
        this.setDefaultValues();
        this.promiseButton = Promise.resolve();
      }, () => {
        this.customToastrService.showErrorToastr('Error', 'Something went wrong. Please try again later.');
        this.promiseButton = Promise.resolve();
      });
    } else {
      this.formError = true;
    }
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
