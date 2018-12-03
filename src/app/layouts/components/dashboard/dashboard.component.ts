import {Component, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'fs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.DASHBOARD);
  }
}
