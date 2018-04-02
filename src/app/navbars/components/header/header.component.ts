import {Component, OnDestroy, OnInit} from '@angular/core';
import {FacebookAuthService} from '@app/security/services/facebook-auth.service';
import {UserService} from '@app/core/services/user.service';
import {User} from '@app/shared/models/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '@app/security/services/authentication.service';

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
    this.facebookAuthService.facebookLogout();
    this.currentUser = undefined;
  }

  get isLoggedIn(): boolean {
    return this.facebookAuthService.isLoggedIn();
  }

  get userDisplayName(): string {
    return `${this.currentUser.firstname} ${this.currentUser.lastname}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
