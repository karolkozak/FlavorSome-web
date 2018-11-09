import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PlacesService} from '@app/places/services/places.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'un-user-ratings-list-item',
  templateUrl: './user-ratings-list-item.component.html',
  styleUrls: ['./user-ratings-list-item.component.scss']
})
export class UserRatingsListItemComponent implements OnInit {
  @Input() rate: Rate;
  @Input() allowEdit: boolean;
  @Input() allowRemove: boolean;
  @Output() removeItem = new EventEmitter<Rate>();
  editing = false;
  placeDetails: Place;

  constructor(private placesService: PlacesService, private customToastrService: CustomToastrService) {
  }

  ngOnInit(): void {
    this.fetchPlaceDetails(this.rate.place.vendorPlaceId);
  }

  private fetchPlaceDetails(vendorPlaceId: any) {
    this.placesService.getPlace(vendorPlaceId).subscribe(place => {
      this.placeDetails = place;
    });
  }

  saveEdited(rate: Rate) {
    this.placesService.editRate(rate).subscribe(editedRate => {
      this.customToastrService.showSuccessToastr('Success', 'Rating was successfully saved');
      this.rate = editedRate;
      this.toggleEditForm();
    });
  }

  toggleEditForm() {
    this.editing = !this.editing;
  }

  remove() {
    this.removeItem.emit(this.rate);
  }
}
