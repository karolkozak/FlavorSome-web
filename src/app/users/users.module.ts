import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UsersListItemComponent} from './components/users-list-item/users-list-item.component';
import {SharedModule} from '@app/shared/shared.module';
import {RouterModule} from '@angular/router';
import {UserRatingsListComponent} from './components/user-ratings-list/user-ratings-list.component';
import {UserRatingsListItemComponent} from './components/user-ratings-list-item/user-ratings-list-item.component';
import {PlacesModule} from '@app/places/places.module';

@NgModule({
  imports: [
    CommonModule,
    PlacesModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    UserDetailsComponent,
    UsersListComponent,
    UsersListItemComponent,
    UserRatingsListComponent,
    UserRatingsListItemComponent
  ],
  exports: [UserDetailsComponent, UsersListComponent, UserRatingsListComponent]
})
export class UsersModule {
}
