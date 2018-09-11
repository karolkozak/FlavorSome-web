import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@app/core/services/config.service';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';

@Component({
  selector: 'un-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'un';

  constructor(private configService: ConfigService,
              private customTranslateService: CustomTranslateService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  onActivate() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.fetchConfig();
    this.customTranslateService.setTranslations();
    this.fetchCurrentUser();
  }

  private fetchConfig() {
    this.configService.getAvailablePlaceTypes().subscribe();
  }

  private fetchCurrentUser() {
    if (this.authenticationService.isLoggedIn()) {
      this.userService.getCurrentUser().subscribe();
    }
  }
}
