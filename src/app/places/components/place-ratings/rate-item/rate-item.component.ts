import {Component, Input} from '@angular/core';
import {Rate} from '@app/places/models/rate';

@Component({
  selector: 'un-rate-item',
  templateUrl: './rate-item.component.html',
  styleUrls: ['./rate-item.component.scss']
})
export class RateItemComponent {
  @Input() rate: Rate;

  getListForRating(rating: number): number[] {
    return  Array.from({length: rating}, (x, i) => i);
  }
}
