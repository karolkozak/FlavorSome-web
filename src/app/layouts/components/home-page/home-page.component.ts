import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'fs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.WELCOME);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
