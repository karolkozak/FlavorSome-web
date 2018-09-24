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

  registrationSuccess() {
    return () => {
      this.userService.getCurrentUser().subscribe();
      this.authenticationService.announceLogin();
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate(['/auth/confirmation']);
    };
  }
}
