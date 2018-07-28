import { Component, OnInit } from '@angular/core';
import {environment} from '@env/environment';

@Component({
  selector: 'un-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent implements OnInit {
  mapCenter: {lat: number, lng: number};
  zoom: number;

  constructor() { }

  ngOnInit() {
    this.mapCenter = environment.location;
    this.zoom = environment.location.zoom;
  }

}
