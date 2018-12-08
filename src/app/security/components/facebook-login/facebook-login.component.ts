import {Component, Input} from '@angular/core';
import {FacebookAuthService} from '../../services/facebook-auth.service';

@Component({
  selector: 'fs-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {
  @Input() loginSuccess: () => void;

  promiseButton: any;

  constructor(private facebookAuthService: FacebookAuthService) {
  }

  public facebookLogin() {
    this.promiseButton = this.facebookAuthService.facebookLogin().then(loginSuccess => {
      if (loginSuccess) {
        this.loginSuccess();
      }
    });
  }
}
