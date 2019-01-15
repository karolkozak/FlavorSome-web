import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PageableParams} from '@app/places/models/pageable-params';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {RatesService} from '@app/places/services/rates.service';

@Component({
  selector: 'fs-user-ratings-list',
  templateUrl: './user-ratings-list.component.html',
  styleUrls: ['./user-ratings-list.component.scss']
})
export class UserRatingsListComponent {
  @Input() ratings: Rate[] = [];
  @Input() allowEdit = false;
  @Input() allowRemove = false;
  @Input() pageableParams: PageableParams;
  @Output() pageableParamsChanged = new EventEmitter<PageableParams>();

  constructor(private ratesService: RatesService, private customToastrService: CustomToastrService) {
  }

  removeRate(rate: Rate) {
    this.ratings = this.ratings.filter(r => r.id !== rate.id);
    this.ratesService.abandonRate(rate).subscribe(response => {
      this.ratings = this.ratings.filter(r => r.id !== rate.id);
      this.customToastrService.showSuccessToastr('Success', 'Rating was successfully removed');
    });
  }
}
