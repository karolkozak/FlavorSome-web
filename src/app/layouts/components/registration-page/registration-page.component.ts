import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../security/services/authentication.service';

@Component({
  selector: 'un-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  registrationnSuccess() {
    return () => {
      const redirectUrl = this.authenticationService.getRedirectUrl() || '';
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate([redirectUrl]);
    };
  }
}
