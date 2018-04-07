import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {FacebookAuthService} from '@app/security/services/facebook-auth.service';
import {UserService} from '@app/core/services/user.service';
import {User} from '@app/shared/models/user';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'un-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  currentUser: User;

  constructor(private facebookAuthService: FacebookAuthService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.authenticationService.loginAnnounce.subscribe(() => {
      if (this.isLoggedIn) {
        this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = {...currentUser});
      }
    });
  }

  public logout() {
    this.facebookAuthService.isFbAuthenticated()
      ? this.facebookAuthService.facebookLogout()
      : this.authenticationService.logout();
      this.currentUser = undefined;
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  get userDisplayName(): string {
    return `${this.currentUser.firstname} ${this.currentUser.lastname}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
