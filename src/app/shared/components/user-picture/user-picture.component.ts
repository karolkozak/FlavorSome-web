import {Component, Input} from '@angular/core';
import {User} from 'app/security/models/user';

@Component({
  selector: 'un-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent {
  @Input() user: User;
}
