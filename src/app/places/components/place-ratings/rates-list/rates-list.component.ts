import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PageableParams} from '@app/places/models/pageable';
import {RatesSorting, ratesSortingOptions} from '@app/places/models/rates-sorting';

@Component({
  selector: 'un-rates-list',
  templateUrl: './rates-list.component.html',
  styleUrls: ['./rates-list.component.scss']
})
export class RatesListComponent implements OnInit {
  @Input() rates: Rate[] = [];
  @Input() pageableParams: PageableParams;
  @Output() pageableParamsChanged = new EventEmitter<PageableParams>();
  sortingOptions: RatesSorting[] = ratesSortingOptions;
  currentSorting: RatesSorting;

  ngOnInit(): void {
    this.currentSorting = this.sortingOptions[0];
  }

  sort(ratesSorting: RatesSorting) {
    this.pageableParams.sortKey = ratesSorting.sortKey;
    this.pageableParams.direction = ratesSorting.sortDirection;
    this.pageableParamsChanged.emit(this.pageableParams);
  }
}
