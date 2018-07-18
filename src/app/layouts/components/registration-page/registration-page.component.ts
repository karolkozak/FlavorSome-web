import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';


@Component({
  selector: 'un-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  constructor(private router: Router, private userService: UserService, private authenticationService: AuthenticationService) {
  }

  registrationnSuccess() {
    return () => {
      this.userService.getCurrentUser().subscribe();
      this.authenticationService.announceLogin();
      const redirectUrl = this.authenticationService.getRedirectUrl() || '';
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate([redirectUrl]);
    };
  }
}
