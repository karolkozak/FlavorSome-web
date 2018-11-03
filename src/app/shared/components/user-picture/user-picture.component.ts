import {Component, Input} from '@angular/core';

@Component({
  selector: 'un-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent {
  @Input() picture: string;
}
