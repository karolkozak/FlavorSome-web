import {Component, Input} from '@angular/core';

@Component({
  selector: 'un-place-picture',
  templateUrl: './place-picture.component.html',
  styleUrls: ['./place-picture.component.scss']
})
export class PlacePictureComponent {
  @Input() pictureUrl: string;
}
