import {Component, Input} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {PlacesService} from '@app/places/services/places.service';
import {ToastrService} from 'ngx-toastr';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Component({
  selector: 'un-user-ratings-list',
  templateUrl: './user-ratings-list.component.html',
  styleUrls: ['./user-ratings-list.component.scss']
})
export class UserRatingsListComponent {
  @Input() ratings: Rate[] = [];
  @Input() allowEdit = false;
  @Input() allowRemove = false;

  constructor(private placesService: PlacesService, private toastr: ToastrService, private customTranslateService: CustomTranslateService) {
  }

  removeRate(rate: Rate) {
    this.ratings = this.ratings.filter(r => r.id !== rate.id);
    this.placesService.deleteRate(rate).subscribe(response => {
      this.ratings = this.ratings.filter(r => r.id !== rate.id);
      let titleMessage = '', message = '';
      this.customTranslateService.getTranslation('Success').subscribe(result => titleMessage = result);
      this.customTranslateService.getTranslation('Rating was successfully removed').subscribe(result => message = result);
      this.toastr.success(message, titleMessage);
    });
  }
}
