import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';


@Component({
  selector: 'fs-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private customTitleService: CustomTitleService
  ) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.REGISTRATION);
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
