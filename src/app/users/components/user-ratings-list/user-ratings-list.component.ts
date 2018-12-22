import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PlacesService} from '@app/places/services/places.service';
import {PageableParams} from '@app/places/models/pageable-params';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-user-ratings-list',
  templateUrl: './user-ratings-list.component.html',
  styleUrls: ['./user-ratings-list.component.scss']
})
@DestroySubscribers()
export class UserRatingsListComponent {
  @Input() ratings: Rate[] = [];
  @Input() allowEdit = false;
  @Input() allowRemove = false;
  @Input() pageableParams: PageableParams;
  @Output() pageableParamsChanged = new EventEmitter<PageableParams>();

  public subscribers: any = {};

  constructor(private placesService: PlacesService, private customToastrService: CustomToastrService) {
  }

  removeRate(rate: Rate) {
    this.ratings = this.ratings.filter(r => r.id !== rate.id);
    this.subscribers.deleteRating = this.placesService.deleteRate(rate).subscribe(() => {
      this.ratings = this.ratings.filter(r => r.id !== rate.id);
      this.customToastrService.showSuccessToastr('Success', 'Rating was successfully removed');
    });
  }
}
