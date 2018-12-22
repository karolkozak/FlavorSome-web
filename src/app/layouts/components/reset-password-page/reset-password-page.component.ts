import {Component, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {ActivatedRoute} from '@angular/router';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
@DestroySubscribers()
export class ResetPasswordPageComponent implements OnInit {
  public subscribers: any = {};
  email: string;
  token: string;

  constructor(private route: ActivatedRoute, private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.RESET_PASSWORD);
    this.subscribers.params = this.route.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
      this.email = queryParams['email'];
    });
  }
}
