import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {FacebookAuthService} from '@app/security/services/facebook-auth.service';
import {UserService} from '@app/core/services/user.service';
import {User} from '@app/security/models/user';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@DestroySubscribers()
export class HeaderComponent implements OnInit {

  public subscribers: any = {};
  currentUser: User;

  constructor(private facebookAuthService: FacebookAuthService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    if (this.isLoggedIn) {
      this.subscribers.user = this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = {...currentUser});
    }
    this.subscribers.loginAnnouncement = this.authenticationService.loginAnnounce.subscribe(() => {
      if (this.isLoggedIn) {
        this.subscribers.currentUser = this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = {...currentUser});
      } else {
        this.currentUser = undefined;
        this.userService.removeCurrentUser();
      }
    });
  }

  public logout() {
    this.facebookAuthService.isFbAuthenticated()
      ? this.facebookAuthService.facebookLogout()
      : this.authenticationService.logout();
  }

  public showPlaceSearcher() {
    return this.isLoggedIn;
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  get userDisplayName(): string {
    return `${this.currentUser.firstname} ${this.currentUser.lastname}`;
  }
}
