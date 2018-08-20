import {Component, Input} from '@angular/core';
import {User} from '@app/security/models/user';

@Component({
  selector: 'un-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent {
  @Input() user: User;
}
