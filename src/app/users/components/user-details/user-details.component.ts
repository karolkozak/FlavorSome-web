import {Component, Input} from '@angular/core';
import {User, UserRole} from '@app/security/models/user';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {UserService} from '@app/core/services/user.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
@DestroySubscribers()
export class UserDetailsComponent {
  @Input() user: User;
  UserRole: typeof UserRole = UserRole;
  promiseButton: Promise<void>;
  showRefreshButton = true;
  public subscribers: any = {};

  constructor(private customAuthService: CustomAuthService,
              private customToastrService: CustomToastrService,
              private userService: UserService) {
  }

  refreshToken() {
    this.promiseButton = new Promise(undefined);
    this.subscribers.refresh = this.customAuthService.refreshToken().subscribe(() => {
      this.customToastrService.showSuccessToastr('Success', 'Please check your email box. We have sent confirmation.');
      this.showRefreshButton = false;
      this.promiseButton = Promise.resolve();
    });
  }

  get isCurrentUser(): boolean {
    return this.userService.isCurrentUser(this.user.userId);
  }
}
