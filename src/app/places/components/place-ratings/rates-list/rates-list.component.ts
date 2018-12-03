import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {RateSortingKey, RatesSorting, ratesSortingOptions} from '@app/places/models/rates-sorting';
import {PageableParams} from '@app/places/models/pageable-params';
import {AuthenticationService} from '@app/security/services/authentication.service';

@Component({
  selector: 'fs-rates-list',
  templateUrl: './rates-list.component.html',
  styleUrls: ['./rates-list.component.scss']
})
export class RatesListComponent implements OnInit {
  @Input() rates: Rate[] = [];
  @Input() pageableParams: PageableParams;
  @Output() pageableParamsChanged = new EventEmitter<PageableParams>();
  sortingOptions: RatesSorting[];
  currentSorting: RatesSorting;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.setSortingOptions();
    this.currentSorting = this.sortingOptions[0];
  }

  private setSortingOptions() {
    if (!this.authenticationService.isLoggedIn()) {
      this.sortingOptions = ratesSortingOptions.filter(option => {
        return option.sortKey !== RateSortingKey.FRIENDS;
      });
    } else {
      this.sortingOptions = ratesSortingOptions;
    }
  }

  sort(ratesSorting: RatesSorting) {
    this.currentSorting = ratesSorting;
    this.pageableParams.sortKey = ratesSorting.sortKey;
    this.pageableParams.direction = ratesSorting.sortDirection;
    this.pageableParamsChanged.emit(this.pageableParams);
  }
}
