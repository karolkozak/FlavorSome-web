import {Component, Input, OnInit} from '@angular/core';
import {CustomAuthService} from '../../services/custom-auth.service';

@Component({
  selector: 'un-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {
  @Input() loginSuccess: () => void;
  userData: any = {};

  constructor(private customAuthService: CustomAuthService) {
  }

  ngOnInit() {
  }

  public login() {
    console.warn('nene');
    this.customAuthService.login(this.userData).then(loginSuccess => {
      if (loginSuccess) {
        this.loginSuccess();
      }
    });
  }
}
