import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {MapsAPILoader} from '@agm/core';
import {PlacesService} from '@app/places/services/places.service';
import {ToastrService} from 'ngx-toastr';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

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
  private googlePlacesService: google.maps.places.PlacesService;
  editing = false;
  placeDetails: google.maps.places.PlaceResult;

  constructor(private mapsAPILoader: MapsAPILoader,
              private placesService: PlacesService,
              private toastr: ToastrService,
              private customTranslateService: CustomTranslateService) {
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
      this.fetchPlaceDetails(this.rate.place.googlePlaceId);
    });
  }

  private fetchPlaceDetails(placeId: string) {
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {placeId};
    this.googlePlacesService.getDetails(placeDetailsRequest, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placeDetails = {...result};
      }
    });
  }

  saveEdited(rate: Rate) {
    this.placesService.editRate(rate).subscribe(editedRate => {
      let titleMessage = '', message = '';
      this.customTranslateService.getTranslation('Success!').subscribe(result => titleMessage = result);
      this.customTranslateService.getTranslation('Rating was successfully saved').subscribe(result => message = result);
      this.toastr.success(message, titleMessage);
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
