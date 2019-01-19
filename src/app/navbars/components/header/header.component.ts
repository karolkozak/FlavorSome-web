import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {FacebookAuthService} from '@app/security/services/facebook-auth.service';
import {UserService} from '@app/core/services/user.service';
import {User} from '@app/security/models/user';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'fs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  currentUser: User;

  constructor(private facebookAuthService: FacebookAuthService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    $('body').click(function() {
      $('#navbarNav').removeClass('show');
    });
  }

  private getCurrentUser() {
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = {...currentUser});
    }
    this.subscription = this.authenticationService.loginAnnounce.subscribe(() => {
      if (this.isLoggedIn) {
        this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = {...currentUser});
      } else {
        this.currentUser = undefined;
        this.userService.removeCurrentUser();
      }
    });
  }

  public logout() {
    if (this.authenticationService.isFbAuthenticated()) {
      this.facebookAuthService.facebookLogout().then(() => this.router.navigate(['']));
      return;
    }
    this.authenticationService.logout();
    this.router.navigate(['']);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
