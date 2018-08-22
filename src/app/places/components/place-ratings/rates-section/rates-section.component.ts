import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PlacesService} from '@app/places/services/places.service';
import {Rate} from '@app/places/models/rate';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {Pageable} from '@app/places/models/pageable';
import {PageableParams} from '@app/places/models/pageable-params';

@Component({
  selector: 'un-rates-section',
  templateUrl: './rates-section.component.html',
  styleUrls: ['./rates-section.component.scss']
})
export class RatesSectionComponent implements OnChanges {
  @Input() placeId: string;
  pageableRates: Pageable<Rate>;
  pageableParams: PageableParams = new PageableParams();

  constructor(private placesService: PlacesService, private authenticationService: AuthenticationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.placeId.currentValue) {
      this.fetchRateList();
    }
  }

  private fetchRateList(pageableParams: PageableParams = this.pageableParams) {
    this.placesService.getRates(this.placeId, pageableParams).subscribe(rates => this.pageableRates = rates);
  }

  addRate(newRate: Rate) {
    this.placesService.addRate(this.placeId, newRate).subscribe(rate => {
      this.fetchRateList();
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
