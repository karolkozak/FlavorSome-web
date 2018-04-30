import {Component} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';

@Component({
  selector: 'un-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private authenticationService: AuthenticationService) {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
