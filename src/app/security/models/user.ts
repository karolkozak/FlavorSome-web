import {Place} from '@app/places/models/place';

export interface User {
  userId: string;
  facebookId: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  friends: User[];
  ownedPlaces: Place[];
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS'
}
