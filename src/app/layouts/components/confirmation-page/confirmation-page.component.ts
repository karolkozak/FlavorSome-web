import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
@DestroySubscribers()
export class ConfirmationPageComponent implements OnInit {
  public subscribers: any = {};
  token: string;
  action: string;
  confirmationError = false;
  promiseButton: Promise<void>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customAuthService: CustomAuthService,
              private authenticationService: AuthenticationService,
              private customToastrService: CustomToastrService,
              private customTitleService: CustomTitleService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.CONFIRMATION);
    this.subscribers.params = this.route.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
      this.action = queryParams['action'];
      if (this.token) {
        this.processToken(this.token, this.action);
      }
    });
  }

  processToken(token: string, action: string) {
    if (action === 'confirmation') {
      this.confirmUserRegistration(token);
    }
  }

  confirmUserRegistration(token: string) {
    this.subscribers.confirmation = this.customAuthService.confirmRegistration(token).subscribe(() => {
      this.customToastrService.showSuccessToastr('Success', 'Confirmation successful');
      this.userService.removeCurrentUser(); // to enforce that route guard fetch current user with proper role
      this.router.navigate(['/dashboard']);
    }, () => {
      this.confirmationError = true;
    });
  }

  deleteUserRegistration() {
    this.promiseButton = new Promise(undefined);
    this.subscribers.delete = this.customAuthService.deleteRegistration(this.token).subscribe(() => {
      this.customToastrService.showSuccessToastr('Success', 'Account removed successfully');
      this.authenticationService.logout();
      this.promiseButton = Promise.resolve();
    }, () => {
      this.confirmationError = true;
      this.promiseButton = Promise.resolve();
    });
  }

  refreshToken() {
    this.promiseButton = new Promise(undefined);
    this.subscribers.refresh = this.customAuthService.refreshToken().subscribe(() => {
      this.customToastrService.showSuccessToastr('Success', 'Please check your email box. We have sent confirmation.');
      this.token = undefined;
      this.promiseButton = Promise.resolve();
    }, () => {
      this.confirmationError = true;
      this.promiseButton = Promise.resolve();
    });
  }
}
