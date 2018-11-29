import {Component, Input} from '@angular/core';
import {User, UserRole} from '@app/security/models/user';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {UserService} from '@app/core/services/user.service';

@Component({
  selector: 'un-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user: User;
  UserRole: typeof UserRole = UserRole;
  buttonPromise: any;
  showRefreshButton = true;

  constructor(private customAuthService: CustomAuthService,
              private customToastrService: CustomToastrService,
              private userService: UserService) {
  }

  refreshToken() {
    const observable = this.customAuthService.refreshToken();
    this.buttonPromise = observable.toPromise();
    observable.subscribe(() => {
      this.customToastrService.showSuccessToastr('Success', 'Please check your email box. We have sent confirmation.');
      this.showRefreshButton = false;
    });
  }

  get isCurrentUser(): boolean {
    return this.userService.isCurrentUser(this.user.userId);
  }
}
