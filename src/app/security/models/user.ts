import {Survey} from '@app/places/models/survey';
import {Place} from '@app/places/models/place';

export interface User {
  facebookId: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  friends: User[];
  surveys: Survey[];
  ownedPlaces: Place[];
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS'
}
