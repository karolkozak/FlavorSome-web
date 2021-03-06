import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

const ratingsConfig = {
  minRateValue: 1,
  maxRateValue: 10,
};

@Component({
  selector: 'fs-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.scss']
})
export class RateFormComponent implements OnInit {
  @Input() rate: Rate = new Rate(undefined, '');
  @Input() editing: boolean;
  @Output() rateChanged = new EventEmitter<Rate>();
  rateForm: FormGroup;
  ratingsConfig = ratingsConfig;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      rating: new FormControl(this.rate.rating, Validators.compose([
        Validators.required,
        Validators.min(this.ratingsConfig.minRateValue),
        Validators.max(this.ratingsConfig.maxRateValue)
      ])),
      comments: new FormControl(this.rate.comments, Validators.required),
    });
  }

  addNewRate() {
    if (this.rateForm.valid) {
      this.rateChanged.emit({...this.rate, rating: this.rateForm.get('rating').value, comments: this.rateForm.get('comments').value});
    }
  }
}
