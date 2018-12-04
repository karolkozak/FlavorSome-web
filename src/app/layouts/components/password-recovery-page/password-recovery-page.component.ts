import {Component, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'fs-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss']
})
export class PasswordRecoveryPageComponent implements OnInit {
  constructor(private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.PASSWORD_RECOVERY);
  }
}
