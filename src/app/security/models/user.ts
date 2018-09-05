import {Survey} from '@app/places/models/survey';
import {Place} from '@app/places/models/place';

export interface User {
  userId: string;
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
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS',
  USER = 'USER',
  UNVERIFIED = 'UNVERIFIED'
}
