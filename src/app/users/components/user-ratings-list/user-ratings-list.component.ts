import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PlacesService} from '@app/places/services/places.service';
import {PageableParams} from '@app/places/models/pageable-params';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

@Component({
  selector: 'un-user-ratings-list',
  templateUrl: './user-ratings-list.component.html',
  styleUrls: ['./user-ratings-list.component.scss']
})
export class UserRatingsListComponent {
  @Input() ratings: Rate[] = [];
  @Input() allowEdit = false;
  @Input() allowRemove = false;
  @Input() pageableParams: PageableParams;
  @Output() pageableParamsChanged = new EventEmitter<PageableParams>();

  constructor(private placesService: PlacesService, private customToastrService: CustomToastrService) {
  }

  removeRate(rate: Rate) {
    this.ratings = this.ratings.filter(r => r.id !== rate.id);
    this.placesService.deleteRate(rate).subscribe(response => {
      this.ratings = this.ratings.filter(r => r.id !== rate.id);
      this.customToastrService.showSuccessToastr('Success', 'Rating was successfully removed');
    });
  }
}
