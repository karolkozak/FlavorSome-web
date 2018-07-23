import {Component, Input, OnInit} from '@angular/core';
import {PlacesService} from '@app/places/services/places.service';
import {Rate} from '@app/places/models/rate';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {Pageable, PageableParams} from '@app/places/models/pageable';

@Component({
  selector: 'un-rates-section',
  templateUrl: './rates-section.component.html',
  styleUrls: ['./rates-section.component.scss']
})
export class RatesSectionComponent implements OnInit {
  @Input() placeId: string;
  pageableRates: Pageable<Rate>;
  pageableParams: PageableParams = new PageableParams();

  constructor(private placesService: PlacesService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.fetchRateList();
  }

  private fetchRateList(pageableParams: PageableParams = this.pageableParams) {
    setTimeout(() => {
      this.placesService.getRates(this.placeId, pageableParams).subscribe(rates => this.pageableRates = rates);
    }, 1000);
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
