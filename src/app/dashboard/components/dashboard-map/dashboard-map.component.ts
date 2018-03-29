import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'un-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent implements OnInit {
  public mapCenter: {lat: number, lng: number};
  public zoom: number;

  constructor() { }

  ngOnInit() {
    this.mapCenter = environment.location;
    this.zoom = environment.location.zoom;
  }

}
