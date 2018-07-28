import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '@app/core/services/config.service';

@Component({
  selector: 'un-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  placesSearchForm: FormGroup;
  placeTypes: string[] = [];
  price = 50;
  rating = 100;

  constructor(private formBuilder: FormBuilder, private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getAvailablePlaceTypes().subscribe(
      placeTypes => this.placeTypes = placeTypes
    );

    this.placesSearchForm = this.formBuilder.group({
      location: [''],
      range: ['', Validators.compose([
        Validators.min(10),
        Validators.max(10000),
      ])],
      placeType: [''],
      preferences: [''],
      price: [''],
      rating: ['']
    });
  }

  findPlaces() {
    return null;
  }
}
