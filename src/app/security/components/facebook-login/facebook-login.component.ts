import {Component} from '@angular/core';
import {FacebookAuthService} from '../../services/facebook-auth.service';

@Component({
  selector: 'un-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {

  constructor(private facebookAuthService: FacebookAuthService) {
  }

  public facebookLogin() {
    this.facebookAuthService.facebookLogin();
  }
}
