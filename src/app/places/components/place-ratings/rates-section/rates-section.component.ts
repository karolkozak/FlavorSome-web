import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PlacesService} from '@app/places/services/places.service';
import {Rate} from '@app/places/models/rate';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {Pageable} from '@app/places/models/pageable';
import {PageableParams} from '@app/places/models/pageable-params';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-rates-section',
  templateUrl: './rates-section.component.html',
  styleUrls: ['./rates-section.component.scss']
})
@DestroySubscribers()
export class RatesSectionComponent implements OnChanges {
  @Input() placeId: string;
  pageableRates: Pageable<Rate>;
  pageableParams: PageableParams = new PageableParams();

  public subscribers: any = {};

  constructor(private placesService: PlacesService, private authenticationService: AuthenticationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.placeId.currentValue) {
      this.fetchRateList();
    }
  }

  fetchRateList(pageableParams: PageableParams = this.pageableParams) {
    this.subscribers.ratings = this.placesService.getRates(this.placeId, pageableParams).subscribe(rates => this.pageableRates = rates);
  }

  addRate(newRate: Rate) {
    this.subscribers.addRating = this.placesService.addRate(this.placeId, newRate).subscribe(rate => {
      this.fetchRateList();
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
