import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'un-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  @Input() placeDetails: google.maps.places.PlaceResult;

  constructor() { }

  ngOnInit() {
  }
}
