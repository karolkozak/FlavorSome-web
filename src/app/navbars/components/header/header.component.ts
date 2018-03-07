import {Component} from '@angular/core';
import {FacebookAuthService} from '../../../security/services/facebook-auth.service';

@Component({
  selector: 'un-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private facebookAuthService: FacebookAuthService) {
  }

  public logout() {
    this.facebookAuthService.facebookLogout();
  }

  get isLoggedIn(): boolean {
    return this.facebookAuthService.isLoggedIn();
  }
}
