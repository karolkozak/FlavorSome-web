import {Component, OnDestroy, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'fs-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  email: string;
  token: string;

  constructor(private route: ActivatedRoute, private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.RESET_PASSWORD);
    this.subscription = this.route.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
      this.email = queryParams['email'];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
