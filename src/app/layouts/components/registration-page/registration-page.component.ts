import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';


@Component({
  selector: 'fs-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
@DestroySubscribers()
export class RegistrationPageComponent implements OnInit {
  public subscribers: any = {};
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
      this.subscribers.currentUser = this.userService.getCurrentUser().subscribe();
      this.authenticationService.announceLogin();
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate(['/auth/confirmation']);
    };
  }
}
