import {Component, Input} from '@angular/core';
import {FacebookAuthService} from '../../services/facebook-auth.service';

@Component({
  selector: 'un-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {
  @Input() loginSuccess: () => void;

  constructor(private facebookAuthService: FacebookAuthService) {
  }

  public facebookLogin() {
    this.facebookAuthService.facebookLogin().then(loginSuccess => {
      if (loginSuccess) {
        this.loginSuccess();
      }
    });
  }
}
