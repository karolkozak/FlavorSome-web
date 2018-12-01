import {Component, Input} from '@angular/core';
import {User} from '@app/security/models/user';

@Component({
  selector: 'fs-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: User[];
}
