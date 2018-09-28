import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AboutService} from '@app/core/services/about.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {AboutMessage} from '@app/layouts/models/about-message';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';

@Component({
  selector: 'un-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private aboutService: AboutService,
              private customToastrService: CustomToastrService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      content: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(user => {
        this.messageForm.setValue({email: user.email, content: ''});
      });
    }
  }

  sendMessage() {
    if (this.messageForm.valid) {
      this.aboutService.sendMessage(this.messageForm.value as AboutMessage).subscribe(response => {
        this.customToastrService.showSuccessToastr('Success', 'Your message has been successfully sent!');
        this.messageForm.reset();
      }, () => {
        this.customToastrService.showErrorToastr('Error', 'Something went wrong. Please try again later.');
      });
    }
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
