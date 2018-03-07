import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';

@Component({
  selector: 'un-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  placeTypes: string[] = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.getAvailablePlaceTypes().subscribe(v => this.placeTypes = v);
  }
}
