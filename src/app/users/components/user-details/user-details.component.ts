import {Component, Input} from '@angular/core';
import {User, UserRole} from '@app/security/models/user';

@Component({
  selector: 'un-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user: User;
  UserRole: typeof UserRole = UserRole;
}
