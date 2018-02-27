import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../security/services/authentication.service';
import {FacebookAuthService} from '../../../security/services/facebook-auth.service';

@Component({
  selector: 'un-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private facebookAuthService: FacebookAuthService) {
  }

  ngOnInit() {
  }

  public logout() {
    this.facebookAuthService.facebookLogout();
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
