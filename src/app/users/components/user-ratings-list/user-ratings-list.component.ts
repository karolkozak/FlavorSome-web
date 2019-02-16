import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PageableParams} from '@app/places/models/pageable-params';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {RatesService} from '@app/places/services/rates.service';
import {RateSortingKey, RatesSorting, ratesSortingOptions} from '@app/places/models/rates-sorting';

@Component({
  selector: 'fs-user-ratings-list',
  templateUrl: './user-ratings-list.component.html',
  styleUrls: ['./user-ratings-list.component.scss']
})
export class UserRatingsListComponent implements OnInit, OnChanges {
  @Input() ratings: Rate[] = [];
  @Input() allowRemove = false;
  @Input() pageableParams: PageableParams;
  @Input() isCurrentUser = false;
  @Output() pageableParamsChanged = new EventEmitter<PageableParams>();
  sortingOptions: RatesSorting[];
  currentSorting: RatesSorting;

  constructor(private ratesService: RatesService, private customToastrService: CustomToastrService) {
  }

  ngOnInit(): void {
    this.setSortingOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCurrentUser) {
      this.setSortingOptions();
    }
  }

  setSortingOptions() {
    if (!this.isCurrentUser) {
      this.sortingOptions = ratesSortingOptions.filter(option => {
        return option.sortKey !== RateSortingKey.FRIENDS;
      });
    } else if (this.isCurrentUser && this.allowRemove) {  // for unrated list - here we sort only by rateing date
      this.sortingOptions = ratesSortingOptions.filter(option => {
        return option.sortKey === RateSortingKey.RATING_DATE;
      });
    } else {
      this.sortingOptions = ratesSortingOptions;
    }
    this.currentSorting = this.sortingOptions[0];
  }

  sort(ratesSorting: RatesSorting) {
    this.currentSorting = ratesSorting;
    this.pageableParams.sortKey = ratesSorting.sortKey;
    this.pageableParams.direction = ratesSorting.sortDirection;
    this.pageableParamsChanged.emit(this.pageableParams);
  }

  removeRate(rate: Rate) {
    this.ratesService.abandonRate(rate).subscribe(response => {
      this.ratings = this.ratings.filter(r => r.id !== rate.id);
      this.customToastrService.showSuccessToastr('Success', 'Rating was successfully removed');
    });
  }
}
