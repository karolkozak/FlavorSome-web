import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PlacesService} from '@app/places/services/places.service';
import {Rate} from '@app/places/models/rate';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {Pageable} from '@app/places/models/pageable';
import {PageableParams} from '@app/places/models/pageable-params';
import {UserService} from '@app/core/services/user.service';
import {User, UserRole} from '@app/security/models/user';

@Component({
  selector: 'fs-rates-section',
  templateUrl: './rates-section.component.html',
  styleUrls: ['./rates-section.component.scss']
})
export class RatesSectionComponent implements OnInit, OnChanges {
  @Input() placeId: string;
  pageableRates: Pageable<Rate>;
  pageableParams: PageableParams = new PageableParams();
  private currentUser: User;

  constructor(private placesService: PlacesService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.placeId.currentValue) {
      if (this.isLoggedIn()) {
        this.pageableParams = new PageableParams({isLogged: true});
      }
      this.fetchRateList();
    }
  }

  fetchRateList(pageableParams: PageableParams = this.pageableParams) {
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

  public hasRequiredRole(): boolean {
    return this.currentUser.role !== UserRole.UNVERIFIED;
  }
}
