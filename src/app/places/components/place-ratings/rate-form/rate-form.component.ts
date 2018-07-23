import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Rate} from '@app/places/models/rate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'un-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.scss']
})
export class RateFormComponent implements OnInit {
  @Output() rateAdded = new EventEmitter<Rate>();
  rateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      rating: ['', Validators.required],
      comments: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ])],
    });
  }

  addNewRate() {
    if (this.rateForm.valid) {
      this.rateAdded.emit(new Rate(this.rateForm.get('rating').value, this.rateForm.get('comments').value));
    }
  }
}
