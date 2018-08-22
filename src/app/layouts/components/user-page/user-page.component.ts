import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '@app/core/services/user.service';
import {User} from '@app/security/models/user';
import {Rate} from '@app/places/models/rate';
import {Subscription} from 'rxjs/Subscription';
import {PlacesService} from '@app/places/services/places.service';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'un-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  userId: string;
  userDetailsTabs: string[] = [];
  user: User;
  ratingsList: Rate[];
  unnratedList: Rate[];
  selectedTab: number;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private placesService: PlacesService) {
  }

  rate = {id: 1, author: this.user, googlePlaceId: 'ChIJ0QIxIxBbFkcRzdl4v6nUZKs',
    ratingDate: new Date().toDateString(), rating: 4, comments: 'That is great'};

  unrated = {id: 2, author: this.user, googlePlaceId: 'ChIJ0QIxIxBbFkcRzdl4v6nUZKs', ratingDate: new Date().toDateString(),
    rating: undefined, comments: undefined};

  ngOnInit() {
    this.userDetailsTabs = ['User Details', 'Rated places', 'Places to rate', 'Friends'];
    this.userService.getCurrentUser().subscribe();  // for entering the user details page from url, needed to check if current user
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe(currentUser => {
        this.user = {...currentUser};
        this.fetchRatings();
        if (!this.isCurrentUser) {
          this.userDetailsTabs.splice(2, 1);
        }
      });
    });
    this.route.queryParams.subscribe(queryParams => {
      const activeTab = queryParams['tab'];
      if (activeTab) {
        this.selectedTab = this.userDetailsTabs
          .map(tabName => tabName.toLowerCase().replace(new RegExp('\\s', 'g'), '_'))
          .indexOf(activeTab);
      }
    });
    this.subscription = this.placesService.userRateAnnounce.subscribe(() => {
      this.fetchRatings();
    });
  }

  fetchRatings() {
    if (this.user) {
      this.userService.getRatings(this.userId).subscribe(ratings => this.ratingsList = {...ratings});
      this.ratingsList = [this.rate, this.rate];
      if (this.isCurrentUser) {
        this.userService.getUnrated().subscribe(unrated => this.unnratedList = {...unrated});
        this.unnratedList = [this.unrated];
      }
    }
  }

  tabChanged(event: MatTabChangeEvent) {
    const tabName = event.tab.textLabel.toLowerCase().replace(new RegExp('\\s', 'g'), '_');
    this.router.navigate(['/users', this.userId], {queryParams: {tab: tabName}});
  }

  get isCurrentUser(): boolean {
    return this.userService.isCurrentUser(this.userId);
  }

  get allowEdit(): boolean {
    return this.isCurrentUser;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}