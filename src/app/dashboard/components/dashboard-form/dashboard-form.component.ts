import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'un-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  placesSearchForm: FormGroup;
  placeTypes = [
    {name: 'Restaurant'},
    {name: 'Cafe'},
    {name: 'Pub'},
    {name: 'FastFood'},
  ];
  price = 50;
  rating = 100;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
