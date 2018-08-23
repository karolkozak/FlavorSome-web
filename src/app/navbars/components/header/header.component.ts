import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {FacebookAuthService} from '@app/security/services/facebook-auth.service';
import {UserService} from '@app/core/services/user.service';
import {User} from '@app/security/models/user';
import {Subscription} from 'rxjs/Subscription';
import { Location } from '@angular/common';

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
              private userService: UserService, private location: Location) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = {...currentUser});
    }
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
    this.userService.removeCurrentUser();
  }

  public showPlaceSearcher() {
    return this.location.path() !== '';
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
