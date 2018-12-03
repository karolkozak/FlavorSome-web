import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '@app/core/services/user.service';
import {User, UserRole} from '@app/security/models/user';
import {Rate} from '@app/places/models/rate';
import {Subscription} from 'rxjs/Subscription';
import {PlacesService} from '@app/places/services/places.service';
import {MatTabChangeEvent} from '@angular/material';
import {PageableParams} from '@app/places/models/pageable-params';
import {Pageable} from '@app/places/models/pageable';

@Component({
  selector: 'fs-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  userDetailsTabs: string[] = ['User Details', 'Rated places', 'Places to rate', 'Friends'];
  user: User;
  ratingsList: Pageable<Rate>;
  unratedList: Rate[];
  selectedTab: number;
  pageableParams: PageableParams = new PageableParams();
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private placesService: PlacesService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      if (this.isVerified) {
        this.fetchRatings();
        this.fetchUnrated();
      }
      if (!this.isCurrentUser) {
        this.userDetailsTabs.splice(2, 1);
      }
    });
    this.route.queryParams.subscribe(queryParams => {
      const activeTab = queryParams['tab'];
      if (activeTab) {
        this.selectedTab = this.userDetailsTabs
          .map(tabName => tabName.toLowerCase().replace(new RegExp('\\s', 'g'), '_'))
          .indexOf(activeTab);
      }
    });
    this.subscription = this.placesService.userRateAnnounce.subscribe((rate: Rate) => {
      let updated = false;
      this.ratingsList.content = this.ratingsList.content.map(r => {
        if (r.id === rate.id) {
          updated = !updated;
          return rate;
        }
        return r;
      });
      if (!updated) {
        this.ratingsList.content.push(rate);
      }
      this.unratedList = this.unratedList.filter(r => r.id !== rate.id);
    });
  }

  fetchRatings(pageableParams: PageableParams = this.pageableParams) {
    if (this.user) {
      this.userService.getRatings(this.user.userId, pageableParams).subscribe(ratings => this.ratingsList = {...ratings});
    }
  }

  fetchUnrated() {
    if (this.user && this.isCurrentUser) {
      this.userService.getUnrated().subscribe(unrated => this.unratedList = unrated);
    }
  }

  tabChanged(event: MatTabChangeEvent) {
    const tabName = event.tab.textLabel.toLowerCase().replace(new RegExp('\\s', 'g'), '_');
    this.router.navigate(['/users', this.user.userId], {queryParams: {tab: tabName}});
  }

  get isCurrentUser(): boolean {
    return this.userService.isCurrentUser(this.user.userId);
  }

  get isVerified(): boolean {
    return this.user.role !== UserRole.UNVERIFIED;
  }

  get allowEdit(): boolean {
    return this.isCurrentUser;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
