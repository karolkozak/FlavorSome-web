import {Component, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {MapService} from '@app/core/services/map/map.service';
import {HereMapService} from '@app/core/services/map/here-map.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';

@Component({
  selector: 'fs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {provide: MapService, useClass: HereMapService},
    PlacesSearchService
  ]
})
export class DashboardComponent implements OnInit {
  constructor(private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.DASHBOARD);
    // TODO: retrieve query params for request
  }
}
